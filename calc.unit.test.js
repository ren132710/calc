import Calculator from './Calc.js'

const Calc = new Calculator()

describe('#addEntry', () => {
  beforeEach(() => {
    Calc.clearAll()
  })
  it('should add consecutive digits to the operand', () => {
    Calc.addEntry('1')
    Calc.addEntry('2')
    Calc.addEntry('3')
    Calc.addEntry('4')
    expect(Calc.entry).toBe('1234')
  })

  it('should allow the operand to have a decimal point', () => {
    Calc.addEntry('.')
    Calc.addEntry('4')
    expect(Calc.entry).toBe('.4')
    Calc.clearAll()

    Calc.addEntry('1')
    Calc.addEntry('2')
    Calc.addEntry('.')
    Calc.addEntry('4')
    expect(Calc.entry).toBe('12.4')
  })

  it('should allow no more than one decimal point', () => {
    Calc.addEntry('1')
    Calc.addEntry('2')
    Calc.addEntry('.')
    Calc.addEntry('4')
    Calc.addEntry('.')
    Calc.addEntry('5')
    expect(Calc.entry).toBe('12.45')
  })
})

describe('#clearEntry, #clearAll', () => {
  beforeEach(() => {
    Calc.clearAll()
  })
  it('should allow clearing the entry', () => {
    Calc.addEntry('1')
    Calc.addEntry('2')
    Calc.addEntry('4')
    Calc.addEntry('5')
    Calc.clearEntry()
    expect(Calc.entry).toBe(null)
  })

  it('should allow clearing all entries', () => {
    Calc.addEntry('1')
    Calc.addEntry('2')
    Calc.addEntry('3')
    Calc.addEntry('4')
    Calc.operator = '*'
    expect(Calc.operand).toBe('1234')
    Calc.addEntry('10')
    expect(Calc.entry).toBe('10')
    Calc.clearAll()
    expect(Calc.entry).toBe(null)
    expect(Calc.operator).toBe(null)
    expect(Calc.operand).toBe(null)
  })
})

describe('.operator', () => {
  beforeEach(() => {
    Calc.clearAll()
  })
  it('should successfully set the operator', () => {
    Calc.operator = '+'
    expect(Calc.operator).toBe('+')
    Calc.operator = '-'
    expect(Calc.operator).toBe('-')
    Calc.operator = '*'
    expect(Calc.operator).toBe('*')
    Calc.operator = '/'
    expect(Calc.operator).toBe('/')
  })

  it('should reject an invalid operator', () => {
    Calc.operator = '%'
    expect(Calc.operator).toBe(null)
    Calc.operator = '**'
    expect(Calc.operator).toBe(null)
    Calc.operator = 'abcd'
    expect(Calc.operator).toBe(null)
  })
})

//adding operator
//if operand is null, then operand = entry, entry = null, display operator
//if operand is NOT null, do nothing but display the new operator
