const test = require("ava");
const errors = require("./errors");

test("Should be an object", t => {
    t.true(typeof errors === "object");
});
test("Should have expected error Objects", t => {
    Object.keys(errors).forEach(error => t.true(new errors[error]() instanceof Error));
});
test("Should have a stack and a message in the error object", t => {
    Object.keys(errors).forEach(error => {
        let testingError = new errors[error]("test");

        t.true(testingError.hasOwnProperty("stack"));
        t.true(testingError.hasOwnProperty("message"));
    });
});
