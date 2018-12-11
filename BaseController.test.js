const test = require("ava");
const { spy } = require("sinon");
const BaseController = require("./BaseController");
let fakeLog = {};
let instance;
test.before(() => {
	fakeLog = {
		info: spy(),
		warn: spy(),
		error: spy()
	}
	instance = new BaseController(fakeLog);
})
test("Should resolve to a function as classes do", t => {
    t.true(typeof BaseController === "function");
});
test("Should contain an HTTP property that has a list of status codes", t => {
	t.is(typeof instance.HTTP === 'object', true);
	Object.keys(instance.HTTP).forEach(elem => {
		t.is(typeof instance.HTTP[elem] === 'number', true);
	})
});
test("Should have the required methods on the class", t => {
	t.plan(7);
	t.true(typeof instance.getLogLevelFromStatusCode === 'function');
	t.true(typeof instance.createResponseModel === 'function');
	t.true(typeof instance.createSuccessResponse === 'function');
	t.true(typeof instance.createErrorResponse === 'function');
	t.true(typeof instance.createUnexpectedErrorResponse === 'function');
	t.true(typeof instance.handleServiceErrors === 'function');
	t.true(typeof instance.verifyRequiredParameters === 'function');
});
test("getLogLevelFromStatusCode should act as expected", t => {
	t.is(instance.getLogLevelFromStatusCode(200),"info");
	t.is(instance.getLogLevelFromStatusCode(300),"info");
	t.is(instance.getLogLevelFromStatusCode(400),"warn");
	t.is(instance.getLogLevelFromStatusCode(500),"error");
});
test("createResponseModel should log an info and return a response object on 200", t => {
	let actual = instance.createResponseModel(200, { fizz: 'buzz' });
	let expected = {
		body: { fizz: 'buzz' },
		statusCode: 200,
		headers: {
            "Access-Control-Allow-Origin": "*"
        }
	}
	t.true(fakeLog.info.called);
	t.deepEqual(actual, expected);
});
test("createResponseModel should log an info and return a response object on 300", t => {
	let actual = instance.createResponseModel(300, { fizz: 'buzz' });
	let expected = {
		body: { fizz: 'buzz' },
		statusCode: 300,
		headers: {
            "Access-Control-Allow-Origin": "*"
        }
	}
	t.true(fakeLog.info.called);
	t.deepEqual(actual, expected);
});
test("createResponseModel should log a warn and return a response object on 400", t => {
	let actual = instance.createResponseModel(400, { fizz: 'buzz' });
	let expected = {
		body: { fizz: 'buzz' },
		statusCode: 400,
		headers: {
            "Access-Control-Allow-Origin": "*"
        }
	}
	t.true(fakeLog.info.called);
	t.deepEqual(actual, expected);
});
test("createResponseModel should log an error and return a response object on 500", t => {
	let actual = instance.createResponseModel(500, { fizz: 'buzz' });
	let expected = {
		body: { fizz: 'buzz' },
		statusCode: 500,
		headers: {
            "Access-Control-Allow-Origin": "*"
        }
	}
	t.true(fakeLog.info.called);
	t.deepEqual(actual, expected);
});
test("createSuccessResponse should act as expected", t => {
	let actual = instance.createSuccessResponse({ fizz: 'buzz' });
	let expected = {
		body: { result: { fizz: 'buzz' } },
		statusCode: 200,
		headers: {
            "Access-Control-Allow-Origin": "*"
        }
	};
	t.deepEqual(actual, expected);
});
test("createErrorResponse should act as expected", t => {
	let actual = instance.createErrorResponse(300, "stuff broke", { fizz: 'buzz' });
	let expected = {
		body: {
			errorCode: 300,
			data: { fizz: 'buzz' },
			message: "stuff broke"
		},
		statusCode: 300,
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	}
	t.deepEqual(actual, expected);
});
test.todo("createUnexpectedErrorResponse should act as expected");
test.todo("handleServiceErrors should act as expected");
test.todo("verifyRequiredParameters should act as expected");
