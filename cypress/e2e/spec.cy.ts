describe('template spec', () => {
  it('test modal', function () {
    cy.visit('/')
    cy.get('h1').contains('Булки').parent().find('li').first().as('bun')
    cy.get('@bun').click()
    cy.debug()
  })
  it('test', function () {
    cy.visit('/')
    cy.get('h1').contains('Булки').parent().find('li').first().as('bun')
    cy.get('[class^=burger-constructor_container__]').first().children('div').first().as('burgerConstructor');
    cy.get('@bun').trigger('dragstart')
    cy.get('@burgerConstructor').trigger('drop');
    cy.get('h1').contains('Соусы').parent().find('li').first().as('souce')
    cy.get('[class^=burger-constructor_container__]').first().children('div').eq(1).as('burgerConstructor');
    cy.get('@souce').trigger('dragstart')
    cy.get('@burgerConstructor').trigger('drop');
    cy.get('button[type="button"]').contains('Оформить заказ').as('button');
    cy.get('@button').click();
    const email = 'kok00800@mail.ru'
    const password = 'kok'
    cy.visit('/login')
    cy.get('input.text.input__textfield.text_type_main-default[name="email"]').type(`${email}{enter}`)
    cy.get('input.text.input__textfield.text_type_main-default[name="password"]').type(`${password}`)
    cy.get('button[type="submit"]').contains('Войти').as('button');
    cy.get('@button').click();
    cy.visit('/')
    cy.get('button[type="button"]').contains('Оформить заказ').as('button');
    cy.get('@button').click();
  })
})