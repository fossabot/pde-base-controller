const errors = require("./errors");

describe("Errors tests", () => {
    it("Should be an object", () => {
	    expect(typeof errors === "object").toBeTruthy();
    });
    it("Should have expected error Objects", () => {
	    Object.keys(errors).forEach(error => expect(new errors[error]() instanceof Error).toBeTruthy());
    });
    it("Should have a stack and a message in the error object", () => {
	    Object.keys(errors).forEach(error => {
	        let testingError = new errors[error]("test");

	        expect(testingError.hasOwnProperty("stack")).toBeTruthy();
	        expect(testingError.hasOwnProperty("message")).toBeTruthy();
	    });
    });
});
