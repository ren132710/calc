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

describe('#del', () => {
  beforeEach(() => {
    Calc.clearAll()
  })

  it('should remove one digit from entry', () => {
    Calc.addEntry('123456')
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

describe('#compute', () => {
  beforeEach(() => {
    Calc.clearAll()
  })
  it('should correctly sum the given entry and operand', () => {
    Calc.addEntry('5')
    Calc.operator = '+'
    Calc.addEntry('10')
    expect(Calc.compute()).toBe(15)
  })

  it('should correctly subtract the entry from the operand', () => {
    Calc.addEntry('10')
    Calc.operator = '-'
    Calc.addEntry('5')
    expect(Calc.compute()).toBe(5)
  })

  it('should correctly multiply the entry and the operand', () => {
    Calc.addEntry('10')
    Calc.operator = '*'
    Calc.addEntry('5')
    expect(Calc.compute()).toBe(50)
  })

  it('should correctly divide the operand by the entry', () => {
    Calc.addEntry('10')
    Calc.operator = '/'
    Calc.addEntry('5')
    expect(Calc.compute()).toBe(2)
  })

  it('should return "Infinity" if the operand is divided by 0', () => {
    Calc.addEntry('10')
    Calc.operator = '/'
    Calc.addEntry('0')
    expect(Calc.compute()).toBe(Infinity)
  })
})
