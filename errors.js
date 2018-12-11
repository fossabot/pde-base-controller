const { helpers } = require("common-errors");

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
