const cmp = (a, b) => (a === b ? 0 : a < b ? -1 : 1)
const rcmp = (x, y) => {
  const [a, b] = x
  const [c, d] = y
  let m = b * d
  let s = m && m < 0 ? -1 : 1
  if (m === 0 || b === d) {
    return s * (a > c ? 1 : a < c ? -1 : 0)
  }
  let aa = a * d
  let cc = c * b
  return s * (aa > cc ? 1 : aa < cc ? -1 : 0)
}
const abs = (n) => (n < 0n ? -n : n)
const rabs = (n) => (rcmp(n, rat(0n)) > -1 ? n : rat(-n[0], n[1]))
const gcd = (a, b) => {
  let t = 0n
  let tb = abs(b)
  let ta = abs(a)
  while (tb > 0n) {
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
  return Number(n) / Number(d)
}
ExtendedRational.val = function() {
  return val(this)
}
const zero = rat(0n)
const one = rat(1n)
const infinity = rat(1n, 0n)
const origo = rat(0n, 0n)

const display = ([n, d]) => `${n}${d !== 1 ? '/' + d : ''}`
const lcm = (a, b) => abs(a * b) / gcd(a, b)
const equal = ([a, b], [c, d]) => (a || b) && (c || d) && a * d == b * c

const compareAbs = (a, b) => {
  return rcmp(rabs(a), rabs(b))
}
const add = ([a, b], [c, d]) => rat(a * d + b * c, b * d)
const subtract = ([a, b], [c, d]) => rat(a * d - b * c, b * d)
const multiply = ([a, b], [c, d]) => rat(a * c, b * d)
const divide = ([a, b], [c, d]) => rat(a * d, b * c)
const scalarMultiply = (c, [n, d]) => rat(c * n, c * d)
const height = ([n, d]) => d
const width = ([n, d]) => n

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

rat.rgcd = function([a, b], [c, d]) {
  return rat(gcd(a, c), lcm(b, d))
}
rat.lcm = function([a, b], [c, d]) {
  return rat(lcm(a, c), gcd(b, d))
}

rat.add = add
rat.div = divide
rat.sub = subtract
rat.mul = multiply
rat.scale = scalarMultiply
rat.height = height
rat.width = width
rat.compare = rcmp
rat.compareAbs = compareAbs
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
