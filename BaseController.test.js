const guid = require("uuid/v4");
const errors = require("./errors");
const BaseController = require("./BaseController");
let fakeLog = {};
let instance;

describe("Base controller", () => {
    beforeEach(() => {
        fakeLog = {
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
            trace: jest.fn()
        };
        instance = new BaseController(fakeLog);
    });
    it("Should resolve to a function as classes do", () => {
        expect(typeof BaseController === "function").toBeTruthy();
    });
    it("Should contain an HTTP property that has a list of status codes", () => {
        expect(typeof instance.HTTP === "object").toBe(true);

        Object.keys(instance.HTTP).forEach(elem => {
            expect(typeof instance.HTTP[elem] === "number").toBe(true);
        });
    });
    it("Should have the required methods on the class", () => {
        expect(
            typeof instance.getLogLevelFromStatusCode === "function"
        ).toBeTruthy();
        expect(typeof instance.createResponseModel === "function").toBeTruthy();
        expect(
            typeof instance.createSuccessResponse === "function"
        ).toBeTruthy();
        expect(typeof instance.createErrorResponse === "function").toBeTruthy();
        expect(
            typeof instance.createUnexpectedErrorResponse === "function"
        ).toBeTruthy();
        expect(typeof instance.handleServiceErrors === "function").toBeTruthy();
        expect(
            typeof instance.verifyRequiredParameters === "function"
        ).toBeTruthy();
    });
    it("getLogLevelFromStatusCode should act as expected", () => {
        expect(instance.getLogLevelFromStatusCode(200)).toBe("info");
        expect(instance.getLogLevelFromStatusCode(300)).toBe("info");
        expect(instance.getLogLevelFromStatusCode(400)).toBe("warn");
        expect(instance.getLogLevelFromStatusCode(500)).toBe("error");
    });
    it("createResponseModel should log an info and return a response object on 200", () => {
        let actual = instance.createResponseModel(200, { fizz: "buzz" });
        let expected = {
            body: { fizz: "buzz" },
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.info).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("createResponseModel should log an info and return a response object on 300", () => {
        let actual = instance.createResponseModel(300, { fizz: "buzz" });
        let expected = {
            body: { fizz: "buzz" },
            statusCode: 300,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.info).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("createResponseModel should log a warn and return a response object on 400", () => {
        let actual = instance.createResponseModel(400, { fizz: "buzz" });
        let expected = {
            body: { fizz: "buzz" },
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.warn).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("createResponseModel should log an error and return a response object on 500", () => {
        let actual = instance.createResponseModel(500, { fizz: "buzz" });
        let expected = {
            body: { fizz: "buzz" },
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.error).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("createSuccessResponse should act as expected", () => {
        let actual = instance.createSuccessResponse({ fizz: "buzz" });
        let expected = {
            body: { result: { fizz: "buzz" } },
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(actual).toEqual(expected);
    });
    it("createErrorResponse should act as expected", () => {
        let actual = instance.createErrorResponse(300, "stuff broke", {
            fizz: "buzz"
        });
        let expected = {
            body: {
                errorCode: 300,
                data: { fizz: "buzz" },
                message: "stuff broke"
            },
            statusCode: 300,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(actual).toEqual(expected);
    });
    it("createUnexpectedErrorResponse should act as expected", () => {
        let actual = instance.createUnexpectedErrorResponse({ fizz: "buzz" });
        let expected = {
            body: {
                errorCode: 500,
                data: { fizz: "buzz" },
                message: "An unexpected error occurred!"
            },
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(actual).toEqual(expected);
    });
    it("handleServiceErrors should act as expected when given BadRequestError", () => {
        let actual = instance.handleServiceErrors(
            new errors.BadRequestError("test")
        );
        let expected = {
            body: {
                errorCode: 400,
                message: "test",
                data: undefined
            },
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.warn).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("handleServiceErrors should act as expected when given UnauthorizedError", () => {
        let actual = instance.handleServiceErrors(
            new errors.UnauthorizedError("test")
        );
        let expected = {
            body: {
                errorCode: 401,
                message: "test",
                data: undefined
            },
            statusCode: 401,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.warn).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("handleServiceErrors should act as expected when given ConflictError", () => {
        let actual = instance.handleServiceErrors(
            new errors.ConflictError("test")
        );
        let expected = {
            body: {
                errorCode: 409,
                message: "test",
                data: undefined
            },
            statusCode: 409,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.warn).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("handleServiceErrors should act as expected when given ProxyError", () => {
        let actual = instance.handleServiceErrors(
            new errors.ProxyError("test")
        );
        let expected = {
            body: {
                errorCode: 504,
                message: "test",
                data: undefined
            },
            statusCode: 504,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.error).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("handleServiceErrors should act as expected when given BadAccountError", () => {
        let actual = instance.handleServiceErrors(
            new errors.BadAccountError("test")
        );
        let expected = {
            body: {
                errorCode: 403,
                message: "test",
                data: undefined
            },
            statusCode: 403,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.warn).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("handleServiceErrors should act as expected when given ForbiddenError", () => {
        let actual = instance.handleServiceErrors(
            new errors.ForbiddenError("test")
        );
        let expected = {
            body: {
                errorCode: 403,
                message: "test",
                data: undefined
            },
            statusCode: 403,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.warn).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("handleServiceErrors should act as expected when given NotFoundError", () => {
        let actual = instance.handleServiceErrors(
            new errors.NotFoundError("test")
        );
        let expected = {
            body: {
                errorCode: 404,
                message: "test",
                data: undefined
            },
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.warn).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("handleServiceErrors should act as expected when given ServiceUnavailableError", () => {
        let actual = instance.handleServiceErrors(
            new errors.ServiceUnavailableError("test")
        );
        let expected = {
            body: {
                errorCode: 503,
                message: "test",
                data: undefined
            },
            statusCode: 503,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.error).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("handleServiceErrors should act as expected when given NotAcceptableError", () => {
        let actual = instance.handleServiceErrors(
            new errors.NotAcceptableError("test")
        );
        let expected = {
            body: {
                errorCode: 406,
                message: "test",
                data: undefined
            },
            statusCode: 406,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.warn).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("handleServiceErrors should handle errors as expected when given an unexpected error", () => {
        let actual = instance.handleServiceErrors(new Error("test"));
        let expected = {
            body: {
                errorCode: 500,
                message: "An unexpected error occurred!",
                data: "test"
            },
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        expect(fakeLog.error).toBeCalled();
        expect(actual).toEqual(expected);
    });
    it("verifyRequiredParameters should throw on bad json in the body", () => {
        let event = {
            body: "{\"fizz\": () => {}}"
        };

        expect(() => instance.verifyRequiredParameters(event)).toThrow(
            errors.BadRequestError
        );
    });
    it("verifyRequiredParameters should throw on bad json in the correlationId", () => {
        let event = {
            body: JSON.stringify({ fizz: "buzz" }),
            headers: {
                "correlation-object": JSON.stringify("{\"foo\": () => {}}")
            }
        };

        expect(() => instance.verifyRequiredParameters(event)).toThrow(
            errors.BadRequestError
        );
    });
    it("verifyRequiredParameters should pass hold errors and return them for props not found in the body", () => {
        let event = {
            body: JSON.stringify({ name: "foo", number: 5892345 }),
            headers: {
                "correlation-object": JSON.stringify({ correlationId: guid() })
            }
        };
        let bodyRequires = ["name", "number", "id"];

        expect(() =>
            instance.verifyRequiredParameters(event, [], bodyRequires)
        ).toThrow(errors.BadRequestError);
    });
    it("verifyRequiredParameters throws when required query string doesn't exist", () => {
        let event = {
            body: JSON.stringify({ name: "foo", number: 5892345 }),
            headers: {
                "correlation-object": JSON.stringify({ correlationId: guid() })
            },
            queryStringParameters: {}
        };

        expect(() =>
            instance.verifyRequiredParameters(event, ["foo"], [])
        ).toThrow(errors.BadRequestError);
    });
    it("verifyRequiredParameters doesn't throw on happy path for both body and query strings", () => {
        let event = {
            body: JSON.stringify({ name: "foo", number: 5892345 }),
            headers: {
                "correlation-object": JSON.stringify({ correlationId: guid() })
            },
            queryStringParameters: {
                lo: 1
            }
        };
        let bodyRequires = ["name", "number"];
        let queryRequires = ["lo"];

        expect(() =>
            instance.verifyRequiredParameters(
                event,
                queryRequires,
                bodyRequires
            )
        ).not.toThrow();
    });
    it("verifyRequiredParameters throws on no headers in the event object", () => {
        let event = {
            body: JSON.stringify({ name: "foo", number: 5892345 }),
            queryStringParameters: { lo: 1 }
        };
        let bodyRequires = ["name", "number"];
        let queryRequires = ["lo"];

        expect(() =>
            instance.verifyRequiredParameters(
                event,
                queryRequires,
                bodyRequires
            )
        ).toThrow(errors.BadRequestError);
    });
    it("verifyRequiredParameters throws when there is no query string", () => {
        let event = {
            body: JSON.stringify({ name: "foo", number: 5892345 })
        };
        let bodyRequires = ["name", "number"];
        let queryRequires = ["lo"];

        expect(() =>
            instance.verifyRequiredParameters(
                event,
                queryRequires,
                bodyRequires
            )
        ).toThrow(errors.BadRequestError);
    });
});
