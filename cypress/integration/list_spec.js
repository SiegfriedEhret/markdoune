describe("Should work for list", () => {
	beforeEach(() => {
		cy.visit("/example/");
	});

	it("should work for everyting", () => {
		cy.get("textarea").setTextCaretPosition(0, 35);
		cy.get(".mark-list-numbers").click();
		cy.get("textarea").should(
			"have.value",
			"1. test 1\n2.         test 2\n3. test 3\n4. test 4"
		);
	});

	it("should work for the first line", () => {
		cy.get("textarea").setTextCaretPosition(0, 6);
		cy.get(".mark-list-numbers").click();
		cy.get("textarea").should(
			"have.value",
			"1. test 1\n        test 2\ntest 3\ntest 4"
		);
	});

	it("should work for the second line", () => {
		cy.get("textarea").setTextCaretPosition(14, 17);
		cy.get(".mark-list-numbers").click();
		cy.get("textarea").should(
			"have.value",
			"test 1\n1.         test 2\ntest 3\ntest 4"
		);
	});

	it("should work for the last line", () => {
		cy.get("textarea").setTextCaretPosition(35, 35);
		cy.get(".mark-list-numbers").click();
		cy.get("textarea").should(
			"have.value",
			"test 1\n        test 2\ntest 3\n1. test 4"
		);
	});

	it("should work for first lines (multi)", () => {
		cy.get("textarea").setTextCaretPosition(3, 17);
		cy.get(".mark-list-numbers").click();
		cy.get("textarea").should(
			"have.value",
			"1. test 1\n2.         test 2\ntest 3\ntest 4"
		);
	});

	it("should work for last lines (multi)", () => {
		cy.get("textarea").setTextCaretPosition(28, 29);
		cy.get(".mark-list-numbers").click();
		cy.get("textarea").should(
			"have.value",
			"test 1\n        test 2\n1. test 3\n2. test 4"
		);
	});

	it("should work for multi lines", () => {
		cy.get("textarea").setTextCaretPosition(7, 28);
		cy.get(".mark-list-numbers").click();
		cy.get("textarea").should(
			"have.value",
			"test 1\n1.         test 2\n2. test 3\ntest 4"
		);
	});
});
