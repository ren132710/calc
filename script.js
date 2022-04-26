import Calculator from './Calc.js'

/*
 *Actions / Set up event listeners, use global event listener
 *
 *  - encapsulate compute logic in class
 *  - keep UI out of the class so it can be unit tested
 *  - Behavior
 *  - Enter numbers, add to operand div
 *  - Enter operator -> moves operand to secondaryOperand, add operator to secondaryOperand
 *  - Enter numbers, add to primary Operand div
 *  - Click equal
 *     - solve problem
 *     -clear history
 *     -enter answer in operand
 *
 */

const Calc = new Calculator()

const operand = document.querySelector('[data-operand]')
const operator = document.querySelector('[data-operator]')
const entry = document.querySelector('[data-entry]')

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e)
  })
}

//Clear entry
addGlobalEventListener('click', '[data-clear-entry]', (e) => {
  Calc.clearEntry()
  entry.textContent = ''
})

//Clear all entries
addGlobalEventListener('click', '[data-clear-all]', (e) => {
  Calc.clearAll()
  operand.textContent = ''
  operator.textContent = ''
  entry.textContent = ''
})

//Add a digit to the entry
addGlobalEventListener('click', '[data-number]', (e) => {
  Calc.addEntry(e.target.textContent)
  entry.textContent = Calc.entry
})

//Select an operator
addGlobalEventListener('click', '[data-operator]', (e) => {
  if (operand.textContent === '') {
    Calc.operand = entry.textContent
    Calc.operator = e.target.textContent
    Calc.clearEntry()

    operand.textContent = entry.textContent
    operator.textContent = e.target.textContent
    entry.textContent = ''
  } else {
    operator.textContent = e.target.textContent
  }
})

//equals
addGlobalEventListener('click', '[data-equals]', (e) => {
  //solve problem and display on operand
  //clear history
  console.log(e.target.textContent)
})

//Del button
addGlobalEventListener('click', '[data-delete]', (e) => {
  console.log(e.target)
})
