describe("Should work for quote", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("should work for everyting", () => {
		cy.get("textarea").setTextCaretPosition(0, 35);
		cy.get(".mark-quote").click();
		cy.get("textarea").should(
			"have.value",
			"> test 1\n>         test 2\n> test 3\n> test 4"
		);
	});

	it("should work for the first line", () => {
		cy.get("textarea").setTextCaretPosition(0, 6);
		cy.get(".mark-quote").click();
		cy.get("textarea").should(
			"have.value",
			"> test 1\n        test 2\ntest 3\ntest 4"
		);
	});

	it("should work for the second line", () => {
		cy.get("textarea").setTextCaretPosition(14, 17);
		cy.get(".mark-quote").click();
		cy.get("textarea").should(
			"have.value",
			"test 1\n>         test 2\ntest 3\ntest 4"
		);
	});

	it("should work for the last line", () => {
		cy.get("textarea").setTextCaretPosition(35, 35);
		cy.get(".mark-quote").click();
		cy.get("textarea").should(
			"have.value",
			"test 1\n        test 2\ntest 3\n> test 4"
		);
	});

	it("should work for first lines (multi)", () => {
		cy.get("textarea").setTextCaretPosition(3, 17);
		cy.get(".mark-quote").click();
		cy.get("textarea").should(
			"have.value",
			"> test 1\n>         test 2\ntest 3\ntest 4"
		);
	});

	it("should work for last lines (multi)", () => {
		cy.get("textarea").setTextCaretPosition(28, 29);
		cy.get(".mark-quote").click();
		cy.get("textarea").should(
			"have.value",
			"test 1\n        test 2\n> test 3\n> test 4"
		);
	});

	it("should work for multi lines", () => {
		cy.get("textarea").setTextCaretPosition(7, 28);
		cy.get(".mark-quote").click();
		cy.get("textarea").should(
			"have.value",
			"test 1\n>         test 2\n> test 3\ntest 4"
		);
	});
});
