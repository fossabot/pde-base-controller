const {
    BadRequestError,
    BadAccountError,
    ConflictError,
    ForbiddenError,
    ProxyError,
    UnauthorizedError,
    NotFoundError,
    ServiceUnavailableError,
    NotAcceptableError
} = require("./errors");

module.exports = class BaseController {
    constructor(loggerService) {
        this.logger = loggerService;
    }

    get HTTP() {
        return {
            OK: 200,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            NOT_ACCEPTABLE: 406,
            CONFLICT: 409,
            INTERNAL_SERVER_ERROR: 500,
            SERVICE_UNAVAILABLE: 503,
            GATEWAY_TIMEOUT: 504
        };
    }

    /**
     * Gets the proper logging level for that status code passed.
     * This can handle both a number or a string status code.
     * @param {String/Number} statusCode
     * @returns {String} proper log level for the statusCode
     */
    getLogLevelFromStatusCode(statusCode) {
        const levels = {
            2: "info", // 2XX
            3: "info", // 3XX
            4: "warn", // 4XX
            5: "error" // 5XX
        };

        // if the statusCode is defined and the status code matches one of the expected options,
        // then return that option
        // else return "error"
        const statusChar = statusCode ? statusCode.toString()[0] : undefined;

        return statusChar && levels[statusChar] ? levels[statusChar] : "error";
    }

    createResponseModel(statusCode, body) {
        const level = this.getLogLevelFromStatusCode(statusCode);

        this.logger[level](
            "Creating response",
            { statusCode, body },
            this.constructor.name
        );

        return {
            body,
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };
    }

    createSuccessResponse(result) {
        return this.createResponseModel(this.HTTP.OK, { result });
    }

    createErrorResponse(errorCode, message, data) {
        if (typeof data !== "string") {
            data = (data && data.message) || data;
        }

        return this.createResponseModel(errorCode, {
            errorCode,
            message,
            data
        });
    }

    createUnexpectedErrorResponse(data) {
        return this.createErrorResponse(
            this.HTTP.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred!",
            data
        );
    }

    handleServiceErrors(error) {
        let errorName = error.name || "Unnamed Error";

        // Handle errors
        if (error instanceof BadRequestError) {
            // 400
            this.logger.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(
                this.HTTP.BAD_REQUEST,
                error.message
            );
        } else if (error instanceof UnauthorizedError) {
            // 401
            this.logger.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(
                this.HTTP.UNAUTHORIZED,
                error.message
            );
        } else if (error instanceof ConflictError) {
            // 409
            this.logger.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(this.HTTP.CONFLICT, error.message);
        } else if (error instanceof ProxyError) {
            // 504
            this.logger.error(errorName, error, this.constructor.name);
            return this.createErrorResponse(
                this.HTTP.GATEWAY_TIMEOUT,
                error.message
            );
        } else if (error instanceof BadAccountError) {
            // 403
            this.logger.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(this.HTTP.FORBIDDEN, error.message);
        } else if (error instanceof ForbiddenError) {
            // 403
            this.logger.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(this.HTTP.FORBIDDEN, error.message);
        } else if (error instanceof NotFoundError) {
            // 404
            this.logger.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(this.HTTP.NOT_FOUND, error.message);
        } else if (error instanceof ServiceUnavailableError) {
            // 503
            this.logger.error(errorName, error, this.constructor.name);
            return this.createErrorResponse(
                this.HTTP.SERVICE_UNAVAILABLE,
                error.message
            );
        } else if (error instanceof NotAcceptableError) {
            this.logger.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(
                this.HTTP.NOT_ACCEPTABLE,
                error.message
            );
        }

        // Error 500
        this.logger.error(errorName, error, this.constructor.name);
        return this.createUnexpectedErrorResponse(error);
    }

    // verifyRequiredParameters() collects errors about missing params and throws an Error if any are missing
    // qs and body are expected to be arrays of strings
    // This function also parses the event.body from JSON into an object
    /**
     * @param {Array<String>} qs - Query strings passed in
     * @param {Array<String>} body - Body params that are required
     * @throws {Error} - When we don't have a correlation object in the headers
     * @throws {BadRequestError} - When other errors have accrued
     */
    verifyRequiredParameters(
        eventObject,
        qs,
        body
    ) {
        let errors = [];

        this.logger.trace(
            "BaseController.verifyRequiredParameters() called",
            { qs, body },
            this.constructor.name
        );

        if (eventObject.body) {
            try {
                eventObject.body = JSON.parse(eventObject.body);
            } catch (parseError) {
                throw new BadRequestError(parseError.message);
            }
        }

        // Require the "Correlation-Object" header
        if (eventObject.headers) {
            let correlationObjectHeaderName = "correlation-object";

            // get the current correlationObject from headers
            Object.keys(eventObject.headers).forEach(headerName => {
                if (headerName.toLowerCase() === correlationObjectHeaderName) {
                    // The headerName itself may be any capitalization. So this checks for a case-insenstive match.
                    correlationObjectHeaderName = headerName;
                }
            });

            try {
                // Try to parse the header as JSON. If it fails or if there isn't a correlationId property, then we throw an error
                eventObject.correlationObject = JSON.parse(
                    eventObject.headers[correlationObjectHeaderName]
                );

                if (!eventObject.correlationObject.correlationId)
                    throw new Error();

                // TODO: The correlationObject is intended to be output in all log messages. This is not yet implemented.
            } catch (error) {
                errors.push(
                    "A Correlation-Object header is required in the request."
                );
            }
        } else errors.push("Event headers are missing or malformed.");

        function processPropertySet(propertySetName, requiredProperties) {
            let propertySet = eventObject[propertySetName];

            if (requiredProperties && requiredProperties.length > 0) {
                // fail if the propertySet isn't defined
                if (propertySet === undefined || propertySet === null) {
                    errors.push(
                        `Request event is malformed. The ${propertySetName} object is missing.`
                    );
                } else {
                    // Check for each of the required properties
                    requiredProperties.forEach(propertyName => {
                        let value = propertySet[propertyName];

                        // If the value isn't there or is blank, then add it to the errors list
                        if (!value)
                            errors.push(
                                `The parameter ${propertyName} is required in the Request's ${propertySetName}.`
                            );
                    });
                }
            }
        }

        processPropertySet("queryStringParameters", qs);
        processPropertySet("body", body);

        // If there are any errors, throw an Error object with all of the messages
        if (errors.length > 0) throw new BadRequestError(errors.join(" "));
    }
};
