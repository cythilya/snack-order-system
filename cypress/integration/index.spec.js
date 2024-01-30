describe('Index page', () => {
  it('should update snapshot to Percy correctly', () => {
    cy.visit('http://localhost:3000');
    cy.percySnapshot('main page', {
      widths: [320, 576, 768, 992],
    });
  });
});
