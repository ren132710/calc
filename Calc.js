export default class Calculator {
  constructor() {
    this.clearAll()
  }

  #entry
  #operator
  #operand

  get entry() {
    return this.#entry
  }

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
    if (this.#entry == null) return

    //TODO: Could not get the .includes guard clause to work
    // if (!['+', '-', '*', '/'].includes(value)) return
    if (!(value === '+' || value === '-' || value === '*' || value == '/')) return

    if (this.#operand == null) {
      this.#operator = value
      this.#operand = this.#entry
      this.#entry = null
    } else {
      this.#operand = this.#doMath().toString()
      this.#operator = value
      this.#entry = null
    }
  }

  setEntry(value) {
    if (this.#entry === null) {
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
    this.#operand = null
    this.#operator = null
    return result
  }

  clearEntry() {
    this.#entry = null
  }

  clearAll() {
    this.#entry = null
    this.#operator = null
    this.#operand = null
  }

  del() {
    if (this.#entry === null) return
    this.#entry = this.#entry.slice(0, this.#entry.length - 1) ? this.#entry.slice(0, this.#entry.length - 1) : null
  }

  #doMath() {
    if (this.#operand == null || this.#operator == null || this.#entry == null) return

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
