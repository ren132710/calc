import Calculator from './Calc.js'

const Calc = new Calculator()

describe('#setEntry', () => {
  beforeEach(() => {
    Calc.clearAll()
  })

  it('should add consecutive digits to the entry', () => {
    Calc.setEntry('1')
    Calc.setEntry('2')
    Calc.setEntry('3')
    Calc.setEntry('4')
    expect(Calc.entry).toBe('1234')
  })

  it('should allow the entry to have a decimal point', () => {
    Calc.setEntry('.')
    Calc.setEntry('4')
    expect(Calc.entry).toBe('.4')
    Calc.clearAll()

    Calc.setEntry('1')
    Calc.setEntry('2')
    Calc.setEntry('.')
    Calc.setEntry('4')
    expect(Calc.entry).toBe('12.4')
  })

  it('should allow no more than one decimal point', () => {
    Calc.setEntry('1')
    Calc.setEntry('2')
    Calc.setEntry('.')
    Calc.setEntry('4')
    Calc.setEntry('.')
    Calc.setEntry('5')
    expect(Calc.entry).toBe('12.45')
  })
})

describe('#clearEntry, #clearAll', () => {
  beforeEach(() => {
    Calc.clearAll()
  })

  it('should allow clearing the entry', () => {
    Calc.setEntry('1')
    Calc.setEntry('2')
    Calc.setEntry('4')
    Calc.setEntry('5')
    Calc.clearEntry()
    expect(Calc.entry).toBe(null)
  })

  it('should allow clearing the answer and starting over', () => {
    Calc.setEntry('55555')
    Calc.setOperator('*')
    Calc.setEntry('10')
    expect(Calc.evaluate()).toBe(555550)
    Calc.clearEntry()
    expect(Calc.operand).toBe(null)
    expect(Calc.operator).toBe(null)
    expect(Calc.entry).toBe(null)
  })

  it('should allow clearing all entries', () => {
    Calc.setEntry('1')
    Calc.setEntry('2')
    Calc.setEntry('3')
    Calc.setEntry('4')
    Calc.setOperator('*')
    Calc.setEntry('10')
    expect(Calc.operand).toBe('1234')
    expect(Calc.operator).toBe('*')
    expect(Calc.entry).toBe('10')
    Calc.clearAll()
    expect(Calc.entry).toBe(null)
    expect(Calc.operator).toBe(null)
    expect(Calc.operand).toBe(null)
  })
})

describe('#setOperator', () => {
  beforeEach(() => {
    Calc.clearAll()
  })
  it('should ignore if entry is null', () => {
    Calc.setOperator('+')
    expect(Calc.operator).toBe(null)
  })

  it('should successfully set the operator', () => {
    Calc.setEntry('1')
    Calc.setOperator('+')
    expect(Calc.operator).toBe('+')
    Calc.clearAll()

    Calc.setEntry('2')
    Calc.setOperator('-')
    expect(Calc.operator).toBe('-')
    Calc.clearAll()

    Calc.setEntry('3')
    Calc.setOperator('*')
    expect(Calc.operator).toBe('*')
    Calc.clearAll()

    Calc.setEntry('4')
    Calc.setOperator('/')
    expect(Calc.operator).toBe('/')
    Calc.clearAll()
  })

  it('should ignore an invalid operator', () => {
    Calc.setEntry('1')
    Calc.setOperator('abcd')
    expect(Calc.operator).toBe(null)
  })
})

describe('setOperand', () => {
  beforeEach(() => {
    Calc.clearAll()
  })

  it('should remove commas when setting operand', () => {
    Calc.setOperand('1,200,000')
    expect(Calc.operand).toBe('1200000')
  })
})

describe('#del', () => {
  beforeEach(() => {
    Calc.clearAll()
  })

  it('should remove one digit from entry', () => {
    Calc.setEntry('123456')
    Calc.del()
    expect(Calc.entry).toBe('12345')
    Calc.del()
    expect(Calc.entry).toBe('1234')
    Calc.del()
    expect(Calc.entry).toBe('123')
    Calc.del()
    expect(Calc.entry).toBe('12')
    Calc.del()
    expect(Calc.entry).toBe('1')
    Calc.del()
    expect(Calc.entry).toBe(null)
  })

  it('should do nothing if entry is null', () => {
    Calc.del()
    expect(Calc.entry).toBe(null)
  })
})

describe('#evaluate', () => {
  beforeEach(() => {
    Calc.clearAll()
  })
  it('should correctly sum the given entry and operand', () => {
    Calc.setEntry('5')
    Calc.setOperator('+')
    Calc.setEntry('10')
    expect(Calc.evaluate()).toBe(15)
  })

  it('should correctly subtract the entry from the operand', () => {
    Calc.setEntry('10')
    Calc.setOperator('-')
    Calc.setEntry('5')
    expect(Calc.evaluate()).toBe(5)
    expect(Calc.operand).toBe(null)
    expect(Calc.operator).toBe(null)
    expect(Calc.entry).toBe('5')
  })

  it('should correctly multiply the entry and the operand', () => {
    Calc.setEntry('10')
    Calc.setOperator('*')
    Calc.setEntry('5')
    expect(Calc.evaluate()).toBe(50)
    expect(Calc.operand).toBe(null)
    expect(Calc.operator).toBe(null)
    expect(Calc.entry).toBe('50')
  })

  it('should correctly divide the operand by the entry', () => {
    Calc.setEntry('10')
    Calc.setOperator('/')
    Calc.setEntry('5')
    expect(Calc.evaluate()).toBe(2)
    expect(Calc.operand).toBe(null)
    expect(Calc.operator).toBe(null)
    expect(Calc.entry).toBe('2')
  })

  it('should return null if the operand is divided by 0', () => {
    Calc.setEntry('10')
    Calc.setOperator('/')
    Calc.setEntry('0')
    expect(Calc.evaluate()).toBe(null)
  })

  it('should correctly evaluate a sequence of operations', () => {
    Calc.setEntry('3')
    Calc.setOperator('*')
    Calc.setEntry('3')
    Calc.setOperator('+')
    expect(Calc.operand).toBe('9')
    expect(Calc.operator).toBe('+')
    expect(Calc.entry).toBe(null)
    Calc.setEntry('1')
    Calc.setOperator('-')
    expect(Calc.operand).toBe('10')
    expect(Calc.operator).toBe('-')
    expect(Calc.entry).toBe(null)
    Calc.setEntry('3')
    Calc.setOperator('/')
    expect(Calc.operand).toBe('7')
    expect(Calc.operator).toBe('/')
    expect(Calc.entry).toBe(null)
    Calc.setEntry('2')
  })
})
