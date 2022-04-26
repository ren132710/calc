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
}

// compute() {
//   let result
//   switch (operator) {
//     case '+':
//       result = this.entry + this.secondaryentry
//       break
//     case '-':
//       result = this.entry - this.secondaryentry
//       break
//     case '*':
//       result = this.entry * this.secondaryentry
//       break
//     case '/':
//       result = this.entry * this.secondaryentry
//       break
//   }
//   return result
// }
