export default class Calculator {
  constructor() {
    this.#entry = null
    this.#operator = null
    this.#operand = null
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
    this.#operand = value
  }

  addEntry(digit) {
    if (this.#entry === null) {
      this.#entry = digit
    } else if (digit === '.' && this.#entry.includes('.')) {
      return
    } else {
      this.#entry = this.#entry + digit
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
        }
        break
    }
    return result
  }
}
