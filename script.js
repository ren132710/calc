import Calculator from './Calc.js'

const Calc = new Calculator()

const operand = document.querySelector('[data-operand]')
const operator = document.querySelector('[data-operator]')
const entry = document.querySelector('[data-entry]')

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e)
  })
}

//add digit to entry
addGlobalEventListener('click', '[data-number]', (e) => {
  Calc.setEntry(e.target.textContent)
  entry.textContent = Calc.formatNumber(Calc.entry)
})

//choose operator
addGlobalEventListener('click', '[data-operator]', (e) => {
  Calc.setOperator(e.target.textContent)
  operand.textContent = Calc.operand
  operator.textContent = Calc.operator
  entry.textContent = Calc.entry
})

//evaluate equation
addGlobalEventListener('click', '[data-equals]', (e) => {
  entry.textContent = Calc.formatNumber(Calc.evaluate())
  operand.textContent = Calc.operand
  operator.textContent = Calc.operator
})

//clear entry
addGlobalEventListener('click', '[data-clear-entry]', (e) => {
  Calc.clearEntry()
  entry.textContent = Calc.entry
})

//clear all entries
addGlobalEventListener('click', '[data-clear-all]', (e) => {
  Calc.clearAll()
  operand.textContent = Calc.operand
  operator.textContent = Calc.operator
  entry.textContent = Calc.entry
})

//delete digit from entry
addGlobalEventListener('click', '[data-delete]', (e) => {
  Calc.del()
  entry.textContent = Calc.formatNumber(Calc.entry)
})
