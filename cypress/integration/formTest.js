//// Set up tests that will...
/* 
    ✅  test that you can add text to the box
    ✅  test that you can select multiple toppings
    ✅  test that you can submit the form
*/

// Describe
describe ('Pizza Order Form app', () => {
    // Arrange
    it('Grabs form fields, enters info, checks validation errors, & verifies user can submit form', () => {
        //Act
        //Visit page
        cy.visit("http://localhost:3000/pizza")
        //Checks 'Name' label exists, grabs input field, types & tests a sample Name
        cy.contains('Name')
        cy.get('[name=name]')
            .type('Donatello')
            .should('have.value', 'Donatello')
        // Ensure 'Add to order' button is DISABLED if size and sauce have NOT been clicked
        cy.get('button').should('be.disabled')

        //Pick a size and sauce; ensure button is ENABLED if size and sauce HAVE been clicked
        cy.get('[name=sizes]')
            .select('Personal')
            .should('have.value', 'personal')
        cy.get('button').should('be.disabled')
        cy.get('[id=red]').click()
        cy.get('button').should('not.be.disabled')
        
        //Select multiple toppings
        cy.get('[name=ham]').check()
            .should('be.checked')
        cy.get('[name=pineapple]').check()
            .should('be.checked')
        cy.get('[name=pepperoncini]').check()
            .should('be.checked')
        cy.get('button').should('not.be.disabled')
    
        //Click 'Submit' Button
        cy.get('button').click()
    })
})