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
  operator.textContent = Calc.operator
  operand.textContent = Calc.operand
})

//clear all entries
addGlobalEventListener('click', '[data-clear-all]', (e) => {
  Calc.clearAll()
  operand.textContent = ''
  operator.textContent = ''
  entry.textContent = ''
})

//add digit to entry
addGlobalEventListener('click', '[data-number]', (e) => {
  Calc.addEntry(e.target.textContent)
  entry.textContent = Calc.formatNumber(Calc.entry)
})

//choose operator
addGlobalEventListener('click', '[data-operator]', (e) => {
  if (operand.textContent === '') {
    Calc.operand = entry.textContent
    // console.log('operand ', Calc.operand)
    Calc.operator = e.target.textContent
    Calc.clearEntry()

    operand.textContent = entry.textContent
    operator.textContent = e.target.textContent
    entry.textContent = ''
  } else {
    operator.textContent = e.target.textContent
  }
})

//evaluate
addGlobalEventListener('click', '[data-equals]', (e) => {
  operand.textContent = ''
  operator.textContent = ''
  entry.textContent = ''

  entry.textContent = Calc.formatNumber(Calc.compute())
})

//delete digit from entry
addGlobalEventListener('click', '[data-delete]', (e) => {
  Calc.del()
  const string = entry.textContent
  entry.textContent = string.slice(0, string.length - 1)
})
