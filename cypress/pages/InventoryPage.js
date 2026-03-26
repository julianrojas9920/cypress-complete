import { inventorySelectors } from '../selectors/inventorySelectors'

class InventoryPage {
  verifyPageIsDisplayed() {
    cy.get(inventorySelectors.pageTitle)
      .should('be.visible')
      .and('contain.text', 'Products')
  }

  verifyProductCount(count) {
    cy.get(inventorySelectors.productItem)
      .should('have.length', count)
  }

  addFirstProductToCart() {
    cy.get(inventorySelectors.addToCartBtn).first().click()
  }

  verifyCartBadge(count) {
    cy.get(inventorySelectors.cartBadge)
      .should('be.visible')
      .and('contain.text', count)
  }

  logout() {
    cy.get(inventorySelectors.burgerMenu).click()
    cy.get(inventorySelectors.logoutLink).click()
  }
}

export default new InventoryPage()