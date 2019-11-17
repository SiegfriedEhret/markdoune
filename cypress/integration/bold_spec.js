describe("Should work for bold", () => {
	beforeEach(() => {
		cy.visit("/example/");
	});

	it("should bold everyting", () => {
		cy.get("textarea").setTextCaretPosition(0, 4);
		cy.get(".mark-bold").click();
		cy.get("textarea").should(
			"have.value",
			"**test** 1\n        test 2\ntest 3\ntest 4"
		);
	});

	it("should bold last line", () => {
		cy.get("textarea").setTextCaretPosition(29, 35);
		cy.get(".mark-bold").click();
		cy.get("textarea").should(
			"have.value",
			"test 1\n        test 2\ntest 3\n**test 4**"
		);
	});

	it("should bold multi line", () => {
		cy.get("textarea").setTextCaretPosition(0, 24);
		cy.get(".mark-bold").click();
		cy.get("textarea").should(
			"have.value",
			"**test 1\n        test 2\nte**st 3\ntest 4"
		);
	});
});
