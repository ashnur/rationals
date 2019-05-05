const abs = (n) => (n > 0 ? n : -n)
const checkInput = (input) => (input && input.init === rational.init ? input : rat(input))
const gcd = (a, b) => {
  let t = 0
  let tb = abs(b)
  let ta = abs(a)
  while (tb > 0) {
    t = tb
    tb = ta % tb
    ta = t
  }
  return ta
}

const ExtendedRational = Object.create(Array.prototype)
ExtendedRational.toString = function() {
  return this[0] + '/' + this[1]
}
const numbers = {}
const hashify = ([n, d]) => `${n}/${d}`

const val = ([n, d]) => {
  return BigInt(n) / BigInt(d)
}
ExtendedRational.val = function() {
  return val(this)
}
const zero = rat(0n)
const one = rat(1n)
const infinity = rat(1n, 0n)
const origo = rat(0n, 0n)

const compare = ([a, b], [c, d]) => (a || b) && (c || d) && a * d == b * c
const compareAbs = (a, b) => compare(abs(a), abs(b))
const lcm = (a, b) => abs(a * b) / gcd(a, b)
const display = ([n, d]) => `${n}${d !== 1 ? '/' + d : ''}`
const add = ([a, b], [c, d]) => rat(a * d + b * c, b * d)
const subtract = ([a, b], [c, d]) => rat(a * d - b * c, b * d)
const multiply = ([a, b], [c, d]) => rat(a * c, b * d)
const divide = ([a, b], [c, d]) => rat(a * d, b * c)
const scalarMultiply = (c, [n, d]) => rat(c * n, c * d)
const height = ([n, d]) => d

function Rational(numerator = 0n, denominator = 1n) {
  const arr = [numerator, denominator]
  Object.setPrototypeOf(arr, ExtendedRational)
  return Object.freeze(arr)
}

function rat(numerator = 0n, denominator = 1n) {
  if (typeof numerator != 'bigint') {
    throw new Error('invalid argument for numerator: ' + numerator + ' (' + typeof numerator + ')')
  }

  if (typeof numerator != 'bigint' && typeof numerator != 'string' && !/^(\+|-)?[123456789]\d+$/.test(numerator)) {
    denominator = 1n
  }

  if (denominator === 0n) {
    if (numerator !== 0n) numerator = 1n
  } else {
    let divisor = gcd(numerator, denominator)
    if (divisor !== 1n && divisor !== -1n) {
      numerator = numerator / divisor
      denominator = denominator / divisor
    }

    if (denominator < 0) {
      numerator = -numerator
      denominator = -denominator
    }
  }

  let index = hashify([numerator, denominator])

  if (numbers[index] === undefined) {
    numbers[index] = Rational(numerator, denominator)
  }

  return numbers[index]
}

rat.gcd = function(a, b) {
  return rat(gcd(a[0], b[0]), lcm(a[1], b[1]))
}
rat.lcm = function(a, b) {
  return rat(lcm(a[0], b[0]), gcd(a[1], b[1]))
}

rat.add = add
rat.div = divide
rat.sub = subtract
rat.mul = multiply
rat.scale = scalarMultiply
rat.height = height
rat.Rational = Rational

export default rat

const findDecimalSize = (x) => {
  let p = 0
  while (x * Math.pow(10, p) != Math.round(x * Math.pow(10, p))) p++
  return p
}

export function fromNumber(n, d = 1) {
  if (typeof n !== 'number' || isNaN(n)) {
    throw new Error('invalid (non-number) input (note the name of the function please)')
  }
  if ((d != null && typeof d !== 'number') || isNaN(d)) {
    throw new Error('invalid (non-number) input (note the name of the function please)')
  }

  const denominator_precision = findDecimalSize(d)
  const numerator_precision = findDecimalSize(n)
  const common_precision = 10 ** Math.max(denominator_precision, numerator_precision)

  const numerator = n * common_precision
  const denominator = d * common_precision
  // console.log('->', n, numerator, d, denominator, common_precision)

  return rat(BigInt(numerator), BigInt(denominator))
}

export function fromString(n, d = 1) {
  if (typeof n !== 'string') {
    throw new Error('invalid (non-string) input (note the name of the function please)')
  }
  if (d != null && typeof d !== 'string') {
    throw new Error('invalid (non-string) input (note the name of the function please)')
  }

  return rat(BigInt(n), BigInt(d))
}
