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

  get operator() {
    return this.#operator
  }

  set operator(value) {
    if (!['+', '-', '*', '/'].includes(value)) return
    if (this.#operand == null) {
      this.#operand = this.#entry
      this.#entry = null
      this.#operator = value
    } else {
      this.#operator = value
    }
  }

  get operand() {
    return this.#operand
  }

  set operand(value) {
    this.#operand = this.#unformatNumber(value)
  }

  addEntry(value) {
    if (this.#entry === null) {
      this.#entry = value
    } else if (value === '.' && this.#entry.includes('.')) {
      return
    } else {
      this.#entry += value
    }
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

  compute() {
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
          return null
        } else {
          result = operand / entry
          break
        }
    }
    this.#entry = result
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
