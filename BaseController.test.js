const test = require("ava");
const { spy } = require("sinon");
const guid = require("uuid/v4");
const errors = require("./errors");
const BaseController = require("./BaseController");
let fakeLog = {};
let instance;
test.before(() => {
	fakeLog = {
		info: spy(),
		warn: spy(),
		error: spy(),
		trace: spy()
	};
	instance = new BaseController(fakeLog);
});
test("Should resolve to a function as classes do", t => {
	t.true(typeof BaseController === "function");
});
test("Should contain an HTTP property that has a list of status codes", t => {
	t.is(typeof instance.HTTP === "object", true);
	Object.keys(instance.HTTP).forEach(elem => {
		t.is(typeof instance.HTTP[elem] === "number", true);
	});
});
test("Should have the required methods on the class", t => {
	t.plan(7);
	t.true(typeof instance.getLogLevelFromStatusCode === "function");
	t.true(typeof instance.createResponseModel === "function");
	t.true(typeof instance.createSuccessResponse === "function");
	t.true(typeof instance.createErrorResponse === "function");
	t.true(typeof instance.createUnexpectedErrorResponse === "function");
	t.true(typeof instance.handleServiceErrors === "function");
	t.true(typeof instance.verifyRequiredParameters === "function");
});
test("getLogLevelFromStatusCode should act as expected", t => {
	t.is(instance.getLogLevelFromStatusCode(200), "info");
	t.is(instance.getLogLevelFromStatusCode(300), "info");
	t.is(instance.getLogLevelFromStatusCode(400), "warn");
	t.is(instance.getLogLevelFromStatusCode(500), "error");
});
test("createResponseModel should log an info and return a response object on 200", t => {
	let actual = instance.createResponseModel(200, { fizz: "buzz" });
	let expected = {
		body: { fizz: "buzz" },
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	};
	t.true(fakeLog.info.called);
	t.deepEqual(actual, expected);
});
test("createResponseModel should log an info and return a response object on 300", t => {
	let actual = instance.createResponseModel(300, { fizz: "buzz" });
	let expected = {
		body: { fizz: "buzz" },
		statusCode: 300,
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	};
	t.true(fakeLog.info.called);
	t.deepEqual(actual, expected);
});
test("createResponseModel should log a warn and return a response object on 400", t => {
	let actual = instance.createResponseModel(400, { fizz: "buzz" });
	let expected = {
		body: { fizz: "buzz" },
		statusCode: 400,
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	};
	t.true(fakeLog.info.called);
	t.deepEqual(actual, expected);
});
test("createResponseModel should log an error and return a response object on 500", t => {
	let actual = instance.createResponseModel(500, { fizz: "buzz" });
	let expected = {
		body: { fizz: "buzz" },
		statusCode: 500,
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	};
	t.true(fakeLog.info.called);
	t.deepEqual(actual, expected);
});
test("createSuccessResponse should act as expected", t => {
	let actual = instance.createSuccessResponse({ fizz: "buzz" });
	let expected = {
		body: { result: { fizz: "buzz" } },
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	};
	t.deepEqual(actual, expected);
});
test("createErrorResponse should act as expected", t => {
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
	t.deepEqual(actual, expected);
});
test("createUnexpectedErrorResponse should act as expected", t => {
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
	t.deepEqual(actual, expected);
});
test("handleServiceErrors should act as expected when given BadRequestError", t => {
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
	t.true(fakeLog.warn.called);
	t.deepEqual(actual, expected);
});
test("handleServiceErrors should act as expected when given UnauthorizedError", t => {
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
	t.true(fakeLog.warn.called);
	t.deepEqual(actual, expected);
});
test("handleServiceErrors should act as expected when given ConflictError", t => {
	let actual = instance.handleServiceErrors(new errors.ConflictError("test"));
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
	t.true(fakeLog.warn.called);
	t.deepEqual(actual, expected);
});
test("handleServiceErrors should act as expected when given ProxyError", t => {
	let actual = instance.handleServiceErrors(new errors.ProxyError("test"));
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
	t.true(fakeLog.warn.called);
	t.deepEqual(actual, expected);
});
test("handleServiceErrors should act as expected when given BadAccountError", t => {
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
	t.true(fakeLog.warn.called);
	t.deepEqual(actual, expected);
});
test("handleServiceErrors should act as expected when given ForbiddenError", t => {
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
	t.true(fakeLog.warn.called);
	t.deepEqual(actual, expected);
});
test("handleServiceErrors should act as expected when given NotFoundError", t => {
	let actual = instance.handleServiceErrors(new errors.NotFoundError("test"));
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
	t.true(fakeLog.warn.called);
	t.deepEqual(actual, expected);
});
test("handleServiceErrors should act as expected when given ServiceUnavailableError", t => {
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
	t.true(fakeLog.warn.called);
	t.deepEqual(actual, expected);
});
test("handleServiceErrors should act as expected when given NotAcceptableError", t => {
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
	t.true(fakeLog.warn.called);
	t.deepEqual(actual, expected);
});
test("handleServiceErrors should handle errors as expected when given an unexpected error", t => {
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
	t.true(fakeLog.error.called);
	t.deepEqual(actual, expected);
});
test("verifyRequiredParameters should throw on bad json in the body", t => {
	let event = {
		body: `{\"fizz\": () => {}}`
	};
	t.throws(
		() => instance.verifyRequiredParameters(event),
		errors.BadRequestError
	);
});
test("verifyRequiredParameters should throw on bad json in the correlationId", t => {
	let event = {
		body: JSON.stringify({ fizz: "buzz" }),
		headers: {
			"correlation-object": JSON.stringify(`{\"foo\": () => {}}`)
		}
	};
	t.throws(
		() => instance.verifyRequiredParameters(event),
		errors.BadRequestError
	);
});
test("verifyRequiredParameters should pass hold errors and return them for props not found in the body", t => {
	let event = {
		body: JSON.stringify({ name: "foo", number: 5892345 }),
		headers: {
			"correlation-object": JSON.stringify({ correlationId: guid() })
		}
	};
	let bodyRequires = ["name", "number", "id"];
	t.throws(
		() => instance.verifyRequiredParameters(event, [], bodyRequires),
		errors.BadRequestError
	);
});
test("verifyRequiredParameters throws when required query string doesn't exist", t => {
	let event = {
		body: JSON.stringify({ name: "foo", number: 5892345 }),
		headers: {
			"correlation-object": JSON.stringify({ correlationId: guid() })
		},
		queryStringParameters: {}
	};
	t.throws(
		() => instance.verifyRequiredParameters(event, ["foo"], []),
		errors.BadRequestError
	);
});
test("verifyRequiredParameters doesn't throw on happy path for both body and query strings", t => {
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
	t.notThrows(() =>
		instance.verifyRequiredParameters(event, queryRequires, bodyRequires)
	);
});
test("verifyRequiredParameters throws on no headers in the event object", t => {
	let event = {
		body: JSON.stringify({ name: "foo", number: 5892345 }),
		queryStringParameters: { lo: 1 }
	}
	let bodyRequires = ["name", "number"];
	let queryRequires = ["lo"];
	t.throws(
		() => instance.verifyRequiredParameters(event, queryRequires, bodyRequires),
		errors.BadRequestError
	);
});
test("verifyRequiredParameters throws when there is no query string", t => {
	let event = {
		body: JSON.stringify({ name: "foo", number: 5892345 }),
	}
	let bodyRequires = ["name", "number"];
	let queryRequires = ["lo"];
	t.throws(
		() => instance.verifyRequiredParameters(event, queryRequires, bodyRequires),
		errors.BadRequestError
	);
})
