export default class Calculator {
  constructor() {
    this.clearAll()
  }

  #entry
  #operator
  #operand

  get operand() {
    return this.#operand
  }

  setOperand(value) {
    this.#operand = this.#unformatNumber(value)
  }

  get operator() {
    return this.#operator
  }

  setOperator(value) {
    if (this.#entry === '') return

    //TODO: Could not get this .includes guard clause to work
    // if (!['+', '-', '*', '/'].includes(value)) return
    if (!(value === '+' || value === '-' || value === '*' || value == '/')) return

    if (this.#operand === '') {
      this.#operator = value
      this.#operand = this.#entry
      this.#entry = ''
    } else {
      this.#operand = this.#doMath().toString()
      this.#operator = value
      this.#entry = ''
    }
  }

  get entry() {
    return this.#entry
  }

  setEntry(value) {
    if (this.#entry === '') {
      this.#entry = value
    } else if (value === '.' && this.#entry.includes('.')) {
      return
    } else {
      this.#entry = this.#entry + value
    }
  }

  evaluate() {
    const result = this.#doMath()
    if (result == null) return null
    this.#entry = result.toString()
    this.#operand = ''
    this.#operator = ''
    return result
  }

  clearEntry() {
    this.#entry = ''
  }

  clearAll() {
    this.#entry = ''
    this.#operator = ''
    this.#operand = ''
  }

  del() {
    if (this.#entry === '') return
    this.#entry = this.#entry.slice(0, this.#entry.length - 1) ? this.#entry.slice(0, this.#entry.length - 1) : ''
  }

  #doMath() {
    if (this.#operand === '' || this.#operator === '' || this.#entry === '') return

    const operand = parseFloat(this.#operand)
    const entry = parseFloat(this.#entry)

    let result
    switch (this.#operator) {
      case '+':
        result = operand + entry
        break
      case '-':
        result = operand - entry
        break
      case '*':
        result = operand * entry
        break
      case '/':
        if (entry === 0 || isNaN(entry)) {
          return
        } else {
          result = operand / entry
          break
        }
    }
    return result
  }

  formatNumber(value) {
    const numberFormatter = new Intl.NumberFormat('en')
    const string = value?.toString() || ''
    if (string === '') return

    const [integer, decimal] = string.split('.')
    const formattedInteger = numberFormatter.format(integer)
    if (decimal == null) return formattedInteger
    return formattedInteger + '.' + decimal
  }

  #unformatNumber(value) {
    return value.replace(/,/g, '')
  }
}
