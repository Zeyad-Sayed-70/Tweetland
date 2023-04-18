describe('login process', () => {
  it('login', () => {
    cy.visit('http://localhost:3000')

    // open login dialog
    cy.get('.MuiButtonBase-root').click()

    // fill the inputs with wrong account data
    cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type("test1919@gmail.com")
    cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type("test@1234")
  
    // submit my form
    cy.get('.MuiFormGroup-root > .MuiButtonBase-root').click()

    // check error exist
    cy.get('.css-1etp019-MuiTypography-root').should("contain", /this username ir email isn't correct, try again/g)

    // clear inputs value
    cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').clear()
    cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear()

    // fill the inputs with correct data
    cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type("test1616@gmail.com")
    cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type("test@1234")

    // submit my form
    cy.get('.MuiFormGroup-root > .MuiButtonBase-root').click()

    // wai to load a page
    cy.get('.main-header > .MuiTypography-root').should("be.visible")
    cy.wait(500)

    // check token that sotred in localStorage
    cy.getAllLocalStorage().then((result) => {      
      console.log(result['http://localhost:3000']?.token)
      
      if ( result['http://localhost:3000']?.token ) 
        expect(result['http://localhost:3000'].token).contain(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        )
      else
        throw new Error("token is not defined");
    })
  })
})