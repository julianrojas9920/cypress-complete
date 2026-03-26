// pages/LoginPage.js

import { loginSelectors } from '../selectors/loginSelectors'

class LoginPage {
  navigate() {
    //cy.env(['UI_URL']).then(({ UI_URL }) => {
      //cy.visit(UI_URL)
    //})
    cy.visit('/')
  }

  typeUsername(username) {
    cy.get(loginSelectors.usernameInput).clear().type(username)
  }

  typePassword(password) {
    cy.get(loginSelectors.passwordInput).clear().type(password)
  }

  clickLoginButton() {
    cy.get(loginSelectors.loginButton).click()
  }

  login(username, password) {
    this.typeUsername(username)
    this.typePassword(password)
    this.clickLoginButton()
  }

  verifyErrorMessage(expectedMessage) {
    cy.get(loginSelectors.errorMessage)
      .should('be.visible')
      .and('contain.text', expectedMessage)
  }

  verifyLoginPageIsDisplayed() {
    cy.get(loginSelectors.logo)
      .should('be.visible')
    
    cy.url().should('include',  Cypress.config('baseUrl'))
  }

  verifyLoginSuccess() {
    cy.url()
      .should('include', '/inventory.html')
  }
}

export default new LoginPage()