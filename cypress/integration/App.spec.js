describe("RN Compose Test", () => {
  it("check all needed is present", () => {
    cy.visit("http://localhost:8080/");
    cy.contains("Current User is :: ");
    // cy.contains("A TEXT THAT FAILS THIS TEST");
  });
});
