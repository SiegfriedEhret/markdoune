describe("Should have basic elements", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("should have some elements", () => {
		cy.get("h1").contains("markdoune");
		cy.get("textarea").should("be.visible");
		cy.get("button").should("have.length", 7);
	});
});
