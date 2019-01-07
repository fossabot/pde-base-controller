module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(335);
/******/ })
/************************************************************************/
/******/ ({

/***/ 131:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("TimeoutError", {
  args: ['time', 'inner_error'],
  generateMessage: function(){
  	if(/^\d/.test(this.time)) return "Timeout of '" + this.time + "' exceeded";
  	else return "Timeout exceeded: " + this.time;
  }
})


/***/ }),

/***/ 152:
/***/ (function(module, __unusedexports, __webpack_require__) {

var util = __webpack_require__(64);

var exports = module.exports = {
  helpers: {
    generateClass: __webpack_require__(540)
  },
  middleware: {
    errorHandler: __webpack_require__(511),
    crashProtector: __webpack_require__(575)
  }
};

exports.AlreadyInUseError = exports.AlreadyInUse = __webpack_require__(819);
exports.ArgumentError = exports.Argument = __webpack_require__(713);
exports.ArgumentNullError = exports.ArgumentNull = __webpack_require__(680);
exports.AuthenticationRequiredError = exports.AuthenticationRequired = __webpack_require__(190);
exports.ConnectionError = exports.helpers.generateClass('ConnectionError');
exports.Error = exports.helpers.generateClass('Error');
exports.HttpStatusError = exports.HttpStatus = __webpack_require__(935);
exports.InvalidOperationError = __webpack_require__(172);
exports.NotFoundError = __webpack_require__(337);
exports.NotImplementedError = exports.helpers.generateClass('NotImplementedError'),
exports.NotSupportedError = exports.NotSupported = __webpack_require__(348);
exports.NotPermittedError = exports.NotPermitted = __webpack_require__(924);
exports.OutOfMemoryError = exports.helpers.generateClass('OutOfMemoryError');
exports.RangeError = exports.helpers.generateClass('RangeError', { extends: RangeError });
exports.ReferenceError = exports.helpers.generateClass('ReferenceError', { extends: ReferenceError });
exports.StackOverflowError = exports.helpers.generateClass('StackOverflowError');
exports.SyntaxError = exports.helpers.generateClass('SyntaxError', { extends: SyntaxError });
exports.TimeoutError = __webpack_require__(131)
exports.TypeError = exports.helpers.generateClass('TypeError', { extends: TypeError });
exports.URIError = exports.helpers.generateClass('URIError', { extends: URIError });
exports.ValidationError = exports.Validation = __webpack_require__(968);

exports.io = {
  IOError: __webpack_require__(214)
};
exports.io.DirectoryNotFoundError = exports.helpers.generateClass('DirectoryNotFoundError', { extends: exports.io.IOError });
exports.io.DriveNotFoundError = exports.helpers.generateClass('DriveNotFoundError', { extends: exports.io.IOError });
exports.io.EndOfStreamError = exports.helpers.generateClass('EndOfStreamError', { extends: exports.io.IOError });
exports.io.FileLoadError = __webpack_require__(904);
exports.io.FileNotFoundError = __webpack_require__(38);
exports.io.SocketError = exports.helpers.generateClass('SocketError', { extends: exports.io.IOError });

exports.data = {
  DataError: __webpack_require__(20)
};
exports.data.MemcachedError = exports.helpers.generateClass('MemcachedError', { extends: exports.data.DataError });
exports.data.MongoDBError = exports.helpers.generateClass('MongoDBError', { extends: exports.data.DataError });
exports.data.RedisError = exports.helpers.generateClass('RedisError', { extends: exports.data.DataError });
exports.data.RollbackError = exports.helpers.generateClass('RollbackError', { extends: exports.data.DataError });
exports.data.SQLError = exports.helpers.generateClass('SQLError', { extends: exports.data.DataError });
exports.data.TransactionError = exports.helpers.generateClass('TransactionError', { extends: exports.data.DataError });



exports.Generic = exports.helpers.generateClass('GenericError'); //deprecated


var logErrorDeprecationWarning = false;
module.exports.logError = function(err, cb) {
  if (!logErrorDeprecationWarning) console.warn("logError is deprecated.  Use log instead.");
  logErrorDeprecationWarning = true;

  if (err && !err.isLogged) {
    err.isLogged = true;
    console.error(err);
  }
  if (cb) cb(err);
};

module.exports.log = function(err, message) {
  if (typeof err == 'string') {
    err = new module.exports.Error(err);
  } else {
    if (message) {
      err.message = message;
    }
    err = module.exports.prependCurrentStack(err, 3);
  }
  if (err) {
    console.error(err && err.stack || err);
    err.isLogged = true;
  }
  return err;
}

module.exports.prependCurrentStack = function(err, offset_) {
  var linesToSkip = (typeof offset_ === 'undefined') ? 2 : offset_;
  var stackToPrepend = (new Error()).stack.split("\n").slice(linesToSkip);
  var mainStack = (err.stack || '').split("\n");
  var errTitle = mainStack.shift();
  err.stack = [errTitle].concat(stackToPrepend, "====", mainStack).join("\n");
  return err;
};

/***/ }),

/***/ 172:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("InvalidOperationError", {
  args: ['message', 'inner_error'],
  generateMessage: function(){
    return "Invalid Operation: " + this.message;
  }
})


/***/ }),

/***/ 190:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("AuthenticationRequiredError", {
  args: ['message', 'inner_error'],
  generateMessage: function(){
    return "An attempt was made to perform an operation without authentication: " + this.message;
  }
})


/***/ }),

/***/ 20:
/***/ (function(module, __unusedexports, __webpack_require__) {

module.exports = __webpack_require__(540)('DataError');

/***/ }),

/***/ 214:
/***/ (function(module, __unusedexports, __webpack_require__) {

module.exports = __webpack_require__(540)('IOError');

/***/ }),

/***/ 335:
/***/ (function(module, __unusedexports, __webpack_require__) {

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
} = __webpack_require__(350);

module.exports = class BaseController {
    constructor(logger) {
        this.log = logger;
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

        this.log[level](
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
            this.log.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(
                this.HTTP.BAD_REQUEST,
                error.message
            );
        } else if (error instanceof UnauthorizedError) {
            // 401
            this.log.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(
                this.HTTP.UNAUTHORIZED,
                error.message
            );
        } else if (error instanceof BadAccountError) {
            // 403
            this.log.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(this.HTTP.FORBIDDEN, error.message);
        } else if (error instanceof ForbiddenError) {
            // 403
            this.log.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(this.HTTP.FORBIDDEN, error.message);
        } else if (error instanceof NotFoundError) {
            // 404
            this.log.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(this.HTTP.NOT_FOUND, error.message);
        } else if (error instanceof ConflictError) {
            // 409
            this.log.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(this.HTTP.CONFLICT, error.message);
        } else if (error instanceof ServiceUnavailableError) {
            // 503
            this.log.error(errorName, error, this.constructor.name);
            return this.createErrorResponse(
                this.HTTP.SERVICE_UNAVAILABLE,
                error.message
            );
        } else if (error instanceof ProxyError) {
            // 504
            this.log.error(errorName, error, this.constructor.name);
            return this.createErrorResponse(
                this.HTTP.GATEWAY_TIMEOUT,
                error.message
            );
        } else if (error instanceof NotAcceptableError) {
            this.log.warn(errorName, error, this.constructor.name);
            return this.createErrorResponse(
                this.HTTP.NOT_ACCEPTABLE,
                error.message
            );
        }

        // Error 500
        this.log.error(errorName, error, this.constructor.name);
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
        event,
        qs,
        body
    ) {
        let errors = [];

        this.log.trace(
            "BaseController.verifyRequiredParameters() called",
            { qs, body },
            this.constructor.name
        );

        if (event.body) {
            try {
                event.body = JSON.parse(event.body);
            } catch (parseError) {
                throw new BadRequestError(parseError.message);
            }
        }

        // Require the "Correlation-Object" header
        if (event.headers) {
            let correlationObjectHeaderName = "correlation-object";

            // get the current correlationObject from headers
            Object.keys(event.headers).forEach(headerName => {
                if (headerName.toLowerCase() === correlationObjectHeaderName) {
                    // The headerName itself may be any capitalization. So this checks for a case-insenstive match.
                    correlationObjectHeaderName = headerName;
                }
            });

            try {
                // Try to parse the header as JSON. If it fails or if there isn't a correlationId property, then we throw an error
                event.correlationObject = JSON.parse(
                    event.headers[correlationObjectHeaderName]
                );

                if (!event.correlationObject.correlationId)
                    throw new Error();

                // TODO: The correlationObject is intended to be output in all log messages. This is not yet implemented.
            } catch (error) {
                errors.push(
                    "A Correlation-Object header is required in the request."
                );
            }
        } else errors.push("Event headers are missing or malformed.");

        function processPropertySet(propertySetName, requiredProperties) {
            let propertySet = event[propertySetName];

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


/***/ }),

/***/ 337:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("NotFoundError", {
  args: ['entity_name', 'inner_error'],
  generateMessage: function(){
    return 'Not Found: "' + this.entity_name + '"';
  }
})


/***/ }),

/***/ 348:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("NotSupportedError", {
  args: ['message', 'inner_error'],
  generateMessage: function(){
    return "Not Supported: " + this.message;
  }
})


/***/ }),

/***/ 350:
/***/ (function(module, __unusedexports, __webpack_require__) {

const { helpers } = __webpack_require__(152);

module.exports = {
    BadRequestError: helpers.generateClass("BadRequestError"),
    BadAccountError: helpers.generateClass("BadAccountError"),
    ConflictError: helpers.generateClass("ConflictError"),
    ForbiddenError: helpers.generateClass("ForbiddenError"),
    ProxyError: helpers.generateClass("ProxyError"),
    UnauthorizedError: helpers.generateClass("UnauthorizedError"),
    NotFoundError: helpers.generateClass("NotFoundError"),
    ServiceUnavailableError: helpers.generateClass("ServiceUnavailableError"),
    NotAcceptableError: helpers.generateClass("NotAcceptableError")
};


/***/ }),

/***/ 38:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("FileNotFoundError", {
  args: ['file_name', 'inner_error'],
  extends: __webpack_require__(214),
  generateMessage: function(){
    return "File not found: " + this.file_name;
  }
});


/***/ }),

/***/ 421:
/***/ (function(module) {

module.exports = require("http");

/***/ }),

/***/ 5:
/***/ (function(module) {

module.exports = require("domain");

/***/ }),

/***/ 511:
/***/ (function(module, __unusedexports, __webpack_require__) {

var HttpStatusError = __webpack_require__(935);

module.exports = function errorHandler(err, req, res, next){
  if(!err) {
    if(next) return next();
    else return res.end();
  }

  err = new HttpStatusError(err, req);
  if(err.status_code >= 500) {
    console.error(err.stack);
    err.message = HttpStatusError.message_map[500]; //hide the real error from user agent.
  }

  res.status(err.status_code).send(err.message);
}


/***/ }),

/***/ 540:
/***/ (function(module, __unusedexports, __webpack_require__) {

var util = __webpack_require__(64);
var globalize = __webpack_require__(803);

module.exports = function generateErrorClass(name, options){
  options = options || {};
  if(options.subclass) console.warn("options.subclass is deprecated. use options.extends instead.");
  options.extends = options.extends || options.subclass || Error;
  options.args = options.args || ['message', 'inner_error'];
  options.generateMessage = options.generateMessage || null;
  options.globalize = options.globalize === false ? false : true;

  validateInput(name);
  validateArrayInput(options.args);

  var classConstructor = function classConstructor(){
    Class.super_.call(this);
    if(this.global_initialize) this.global_initialize(Class);

    this.args = arguments;
    for(var i = 0; i<options.args.length; i++){
      this[options.args[i]] = arguments[i];
    }
    this.name = name;
    if(this.generateMessage) this.message = this.generateMessage();
    Class.captureStackTrace(this, Class);
  };

  var classGeneratorFn = new Function('classConstructor', [
    "return function ", name, "(", options.args.join(', '), "){",
      "if(!(this instanceof ", name, ")) {",
        "var instance = Object.create(", name, ".prototype);",
        "classConstructor.apply(instance, arguments);",
        "return instance;",
      "} else {",
        "classConstructor.apply(this, arguments);",
      "}",
    "};",
  ].join(''));
  var Class = classGeneratorFn(classConstructor);

  util.inherits(Class, options.extends);

  Class.prototype.generateMessage = options.generateMessage;

  Class.captureStackTrace = function captureStackTrace(error, error_class){
    Error.captureStackTrace(error, error_class);
    if(error.inner_error && error.inner_error.stack) error.stack += "\n--- inner error ---\n" + error.inner_error.stack;
  }

  if(options.globalize) globalize(Class);
  return Class;
}

var validateInput = function validateInput(str){
  if(typeof str != 'string' || !/^[\-\w]+$/.test(str)) throw new Error("Unsafe or invalid string '" + (str || '').toString() + "' used to generate Error class.");
}
var validateArrayInput = function validateArrayInput(array){
  if(!array || !Array.isArray(array)) throw new Error("Unsafe or invalid args used to generate Error class.");
  for(var i = 0; i<array.length; i++) validateInput(array[i]);
}

/***/ }),

/***/ 575:
/***/ (function(module, __unusedexports, __webpack_require__) {

module.exports = function (errorHandler){
  return function crashProtector(req, res, next) {
    var domain = __webpack_require__(5); //require only if needed, because "Due to their experimental nature, the Domains features are disabled unless the domain module is loaded at least once."
    var d = domain.create();
    d.on('error', function(err){ 
      console.error("Fatal crash protected!");
      d.dispose();
      if(res.finished || Object.keys(res._headers).length) {
        console.error(err && err.stack);
        return res.end();
      } 
      if(errorHandler) errorHandler(err, req, res);
      else next(err);
    });
    d.run(next);
  }
}

var findErrorHandler = function(app){
  try {
    var errorHandler;
    var foundRouter = false;
    for(var i=0; i<app.stack; i++){
      var middleware = app.stack[i];
      if(foundRouter && middleware.handle.length >= 4) {
        errorHandler = middleware;
        break;
      } else if(app.router === middleware.handle) foundRouter = true;
    }
    return errorHandler;
  } catch(e) {
    console.error("Crash protector error", e);
  }
}

/***/ }),

/***/ 64:
/***/ (function(module) {

module.exports = require("util");

/***/ }),

/***/ 680:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("ArgumentNullError", {
  args: ['argumentName', 'inner_error'],
  extends: __webpack_require__(713),
  generateMessage: function(){
    return "Missing argument: " + this.argumentName;
  }
})


/***/ }),

/***/ 713:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("ArgumentError", {
  args: ['argumentName', 'inner_error'],
  generateMessage: function(){
    return "Invalid or missing argument supplied: " + this.argumentName;
  }
})


/***/ }),

/***/ 803:
/***/ (function(module, __unusedexports, __webpack_require__) {

var util = __webpack_require__(64);
var key = "__COMMON-ERRORS-TYPES__";
var global_errors = global[key] = global[key] || {};

module.exports = function global_extend(Class) {
  Class.__original_prototype__ = Class.prototype;
  var global_class = global_errors[Class.name] = global_errors[Class.name] || Class;
  Class.prototype = Class.__global_prototype__ = global_class.prototype;
  Class.prototype.global_initialize = Class.prototype.global_initialize || function global_initialize(Class){
    var proto_keys = Object.keys(Class.__original_prototype__);
    for(var i = 0; i<proto_keys.length; i++) {
      var proto_key = proto_keys[i];
      this[proto_key] = Class.__original_prototype__[proto_key];
    }
  };
}

/***/ }),

/***/ 819:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("AlreadyInUseError", {
  args: ['entity_name', 'arg1', 'arg2', 'arg3', 'arg4'],
  generateMessage: function(){
    var args = Array.prototype.slice.call(this.args, 1);
    return "The specified '" + this.entity_name + "' value is already in use for: " + args.join(', ');
  }
})


/***/ }),

/***/ 904:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("FileLoadError", {
  args: ['file_name', 'inner_error'],
  extends: __webpack_require__(214),
  generateMessage: function(){
    return "Unable to load file: " + this.file_name;
  }
});


/***/ }),

/***/ 924:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
module.exports = generateClass("NotPermittedError", {
  args: ['message', 'inner_error'],
  generateMessage: function(){
    return "An attempt was made to perform an operation that is not permitted: " + this.message;
  }
})


/***/ }),

/***/ 935:
/***/ (function(module, __unusedexports, __webpack_require__) {

var http = __webpack_require__(421);
var util = __webpack_require__(64);

var STATUS_CODE_ATTRIBUTE_NAME = module.exports.STATUS_CODE_ATTRIBUTE_NAME = 'status';

var HttpStatusError = module.exports = function HttpStatusError(status_code, message) {
  if(!(this instanceof HttpStatusError)) {
    var instance = Object.create(HttpStatusError.prototype);
    HttpStatusError.apply(instance, arguments);
    return instance;
  }

  if(typeof message == 'number' && typeof status_code != 'number') {
    //old interface, so swap.
    var c = message;
    message = status_code;
    status_code = c;
  } else if(status_code instanceof Error) {
    var err = status_code;
    var req = message;
    status_code = err.statusCode || err.status_code || err[STATUS_CODE_ATTRIBUTE_NAME];
    if(typeof status_code != "number") {
      status_code = code_map[err.name];
      if(typeof status_code == "function") {
        status_code(err, req);
        status_code = err.status_code;
      }
      status_code = status_code || 500;
    } 
    message = err.message;
    this.stack = err.stack;
  }

  this.status_code = this.statusCode = this[STATUS_CODE_ATTRIBUTE_NAME] = status_code || 500;
  this.name = "HttpStatusError";

  var http_message = "(" + this.status_code + ") " + message_map[status_code] || false;
  this.message = message || http_message;
  if(!this.stack) Error.captureStackTrace(this, HttpStatusError);
  if(message) this.stack = http_message + "\n" + this.stack;
}
util.inherits(HttpStatusError, Error);

var code_map = HttpStatusError.code_map = {
  "ValidationError": 400,
  "ArgumentError": 400,
  "AuthenticationRequiredError": 401,
  "NotPermittedError": 403,
  "ArgumentNullError": function(err, req){
    var method = req && req.method || 'GET';
    var params = req && req.params || {};
    var route_path = req && req.route && req.route.path || '';

    if(/GET|HEAD/i.test(method) || params.hasOwnProperty(err.argumentName) || new RegExp(":" + err.argumentName + '').test(route_path + '/')) err.status_code = 404;
    else err.status_code = 400;
    err.message = err.message.replace(new RegExp("^Missing argument: (" + err.argumentName + ")$"), 'Not Found: "$1"' );
  },
  "NotFoundError": 404,
  "NotSupportedError": 405,
  "AlreadyInUseError": 409,
};

var codes = {};
Object.keys(http.STATUS_CODES).forEach(function(key){
  codes[key] = http.STATUS_CODES[key];
});
var message_map = HttpStatusError.message_map = codes;

/***/ }),

/***/ 968:
/***/ (function(module, __unusedexports, __webpack_require__) {

var generateClass = __webpack_require__(540);
var ArgumentError = __webpack_require__(713);

var ValidationError = module.exports = generateClass("ValidationError", {
  args: ['message', 'code', 'field']
});

ValidationError.prototype.addError = function addError(error) {
  this.errors = this.errors || [];
  this.errors.push(error);
  return this;
}

ValidationError.prototype.addErrors = function addErrors(errors) {
  if(!(errors instanceof Array)) throw new ArgumentError("errors");
  
  this.errors = this.errors || [];
  Array.prototype.push.apply(this.errors, errors);
  return this;
}

ValidationError.prototype.generateMessage = function generateMessage(){
  return this.message || "Validation failed.";
}

ValidationError.prototype.toJSON = function toJSON(){
  var o = {};
  if(this.errors) {
    if(this.message) o.message = this.message;
    o.errors = this.errors.map(function(error){
      return error.toJSON();
    });
  } else {
    if(this.message) o.text = this.message;
    if(this.code) o.code = this.code;
    if(this.field) o.field = this.field;    
  }
  return o;
}

/***/ })

/******/ });