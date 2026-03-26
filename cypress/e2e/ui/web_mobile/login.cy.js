// e2e/ui/we
import LoginPage from '../../../pages/LoginPage'
import InventoryPage from '../../../pages/InventoryPage'

describe('SauceDemo - Login WebMobile', () => {

  beforeEach(() => {
    cy.viewport('iphone-xr')
    LoginPage.navigate()
  })

  context('Happy Path', () => {

    it('TC01 - Login exitoso con usuario standard', () => {
      cy.fixture('users').then((users) => {
        LoginPage.typeUsername(users.validUser.username)
        LoginPage.typePassword(users.validUser.password)
        LoginPage.clickLoginButton()
        InventoryPage.verifyPageIsDisplayed()
        LoginPage.verifyLoginSuccess()
      })
    })

    it('TC02 - Login exitoso y verificar cantidad de productos', () => {
      cy.fixture('users').then((users) => {
        LoginPage.login(users.validUser.username, users.validUser.password)
        InventoryPage.verifyPageIsDisplayed()
        InventoryPage.verifyProductCount(6)
      })
    })

  })

  context('Sad Path', () => {

    it('TC03 - Login fallido con usuario bloqueado', () => {
      cy.fixture('users').then((users) => {
        LoginPage.typeUsername(users.lockedUser.username)
        LoginPage.typePassword(users.lockedUser.password)
        LoginPage.clickLoginButton()
        LoginPage.verifyErrorMessage(
          'Sorry, this user has been locked out.'
        )
      })
    })

    it('TC04 - Login fallido con credenciales invalidas', () => {
      cy.fixture('users').then((users) => {
        LoginPage.typeUsername(users.invalidUser.username)
        LoginPage.typePassword(users.invalidUser.password)
        LoginPage.clickLoginButton()
        LoginPage.verifyErrorMessage(
          'Username and password do not match'
        )
      })
    })

    it('TC05 - Login sin username', () => {
      LoginPage.typePassword('secret_sauce')
      LoginPage.clickLoginButton()
      LoginPage.verifyErrorMessage('Username is required')
    })

    it('TC06 - Login sin password', () => {
      LoginPage.typeUsername('standard_user')
      LoginPage.clickLoginButton()
      LoginPage.verifyErrorMessage('Password is required')
    })

  })

  context('Logout', () => {

    it('TC07 - Logout exitoso', () => {
      cy.fixture('users').then((users) => {
        LoginPage.login(users.validUser.username, users.validUser.password)
        InventoryPage.verifyPageIsDisplayed()
        InventoryPage.logout()
        LoginPage.verifyLoginPageIsDisplayed()
      })
    })

  })

})