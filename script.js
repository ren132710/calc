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

//clear entry
addGlobalEventListener('click', '[data-clear-entry]', (e) => {
  Calc.clearEntry()
  entry.textContent = ''
})

//clear all entries
addGlobalEventListener('click', '[data-clear-all]', (e) => {
  Calc.clearAll()
  operand.textContent = ''
  operator.textContent = ''
  entry.textContent = ''
})

//add a digit to the entry
addGlobalEventListener('click', '[data-number]', (e) => {
  Calc.addEntry(e.target.textContent)
  entry.textContent = Calc.entry
})

//specify the operator
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
  operand.textContent = ''
  operator.textContent = ''
  entry.textContent = ''

  entry.textContent = Calc.compute()
})

//delete digit from entry
addGlobalEventListener('click', '[data-delete]', (e) => {
  Calc.del()
  const string = entry.textContent
  entry.textContent = string.slice(0, string.length - 1)
})

//TODO: Format numeric output
