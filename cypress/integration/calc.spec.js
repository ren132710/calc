import Calculator from '../../Calc.js'

describe('normal calculation', () => {
  it('should correctly handle normal calculations', () => {
    cy.visit('/')
    cy.getCalculatorButton('7').click()
    cy.getCalculatorButton('.').click()
    cy.getCalculatorButton('8').click()
    cy.get('[data-entry]').should('have.text', '7.8')
    cy.getCalculatorButton('+').click()
    cy.get('[data-operand]').should('have.text', '7.8')
    cy.get('.history > [data-operator]').should('have.text', '+')
    cy.get('[data-entry]').should('have.text', '')
    cy.getCalculatorButton('6').click()
    cy.get('[data-entry]').should('have.text', '6')

    //evaluate
    cy.getCalculatorButton('=').click()
    cy.get('[data-operand]').should('have.text', '')
    cy.get('.history > [data-operator]').should('have.text', '')
    cy.get('[data-entry]').should('have.text', '13.8')

    //add .2
    cy.getCalculatorButton('+').click()
    cy.get('[data-operand]').should('have.text', '13.8')
    cy.get('.history > [data-operator]').should('have.text', '+')
    cy.get('[data-entry]').should('have.text', '')
    cy.getCalculatorButton('.').click()
    cy.getCalculatorButton('2').click()
    cy.get('[data-entry]').should('have.text', '0.2')

    //subtract 4
    cy.getCalculatorButton('-').click()
    cy.get('[data-operand]').should('have.text', '14')
    cy.get('.history > [data-operator]').should('have.text', '-')
    cy.get('[data-entry]').should('have.text', '')
    cy.getCalculatorButton('4').click()
    cy.get('[data-entry]').should('have.text', '4')

    //divide by 2
    cy.getCalculatorButton('/').click()
    cy.get('[data-operand]').should('have.text', '10')
    cy.get('.history > [data-operator]').should('have.text', '/')
    cy.get('[data-entry]').should('have.text', '')
    cy.getCalculatorButton('2').click()
    cy.get('[data-entry]').should('have.text', '2')

    //multiply by 3
    cy.getCalculatorButton('*').click()
    cy.get('[data-operand]').should('have.text', '5')
    cy.get('.history > [data-operator]').should('have.text', '*')
    cy.get('[data-entry]').should('have.text', '')
    cy.getCalculatorButton('3').click()
    cy.get('[data-entry]').should('have.text', '3')

    //equals 5
    cy.getCalculatorButton('=').click()
    cy.get('[data-operand]').should('have.text', '')
    cy.get('.history > [data-operator]').should('have.text', '')
    cy.get('[data-entry]').should('have.text', '15')

    //clearAll
    cy.getCalculatorButton('AC').click()
    cy.get('[data-operand]').should('have.text', '')
    cy.get('.history > [data-operator]').should('have.text', '')
    cy.get('[data-entry]').should('have.text', '')
  })
})

describe('misc operations', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should delete a single digit from entry, starting from right', () => {
    cy.getCalculatorButton('5').click()
    cy.getCalculatorButton('5').click()
    cy.getCalculatorButton('5').click()
    cy.get('[data-entry]').should('have.text', '555')
    cy.getCalculatorButton('DEL').click()
    cy.get('[data-entry]').should('have.text', '55')
    cy.getCalculatorButton('DEL').click()
    cy.get('[data-entry]').should('have.text', '5')
    cy.getCalculatorButton('DEL').click()
    cy.get('[data-entry]').should('have.text', '')
  })

  it('should clear entry', () => {
    cy.getCalculatorButton('1').click()
    cy.getCalculatorButton('2').click()
    cy.getCalculatorButton('3').click()
    cy.get('[data-entry]').should('have.text', '123')
    cy.getCalculatorButton('+').click()
    cy.get('[data-operand]').should('have.text', '123')
    cy.get('.history > [data-operator]').should('have.text', '+')
    cy.get('[data-entry]').should('have.text', '')
    cy.getCalculatorButton('4').click()
    cy.get('[data-entry]').should('have.text', '4')
    cy.getCalculatorButton('CE').click()
    cy.get('[data-operand]').should('have.text', '123')
    cy.get('.history > [data-operator]').should('have.text', '+')
    cy.get('[data-entry]').should('have.text', '')
  })

  it('should properly format large numbers', () => {
    cy.getCalculatorButton('5').click()
    cy.getCalculatorButton('5').click()
    cy.getCalculatorButton('5').click()
    cy.getCalculatorButton('5').click()
    cy.getCalculatorButton('5').click()
    cy.getCalculatorButton('5').click()
    cy.getCalculatorButton('5').click()
    cy.getCalculatorButton('5').click()
    cy.get('[data-entry]').should('have.text', '55,555,555')
  })
})
