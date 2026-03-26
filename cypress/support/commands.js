Cypress.Commands.add('getBookingToken', () => {
  cy.fixture('credentials').then((creds) => {
    cy.env(['API_URL']).then(({ API_URL }) => {
      cy.request({
        method:  'POST',
        url:     `${API_URL}/auth`,
        headers: { 'Content-Type': 'application/json' },
        body: {
          username: creds.auth.username,
          password: creds.auth.password,
        },
      }).its('body.token')
    })
  })
})