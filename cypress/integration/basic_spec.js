describe("Should have basic elements", () => {
	beforeEach(() => {
		cy.visit("/example/");
	});

	it("should have some elements", () => {
		cy.get("h1").contains("markdoune");
		cy.get("textarea").should("be.visible");
		cy.get("button").should("have.length", 9);
	});
});
