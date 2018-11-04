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

const numbers = {}

const compare = (a, b) => a[0] * b[1] - a[1] * b[0]

const compareAbs = (a, b) => compare(abs(a), abs(b))
const lcm = (a, b) => abs(a * b) / gcd(a, b)
const hashify = (r) => r[0] + '/' + r[1]
const display = (r) => '' + r[0] + (r[1] != 1 ? '/' + r[1] : '')
const val = (r) => {
  return BigInt(r[0]) / BigInt(r[1])
}
const add = (x, y) => rat(x[0] * y[1] + y[0] * x[1], x[1] * y[1])
const subtract = (x, y) => rat(x[0] * y[1] - y[0] * x[1], x[1] * y[1])
const multiply = (x, y) => rat(x[0] * y[0], x[1] * y[1])
const divide = (x, y) => rat(x[0] * y[1], x[1] * y[0])

const tie = function(fn) {
  return function(y) {
    return fn(this, y)
  }
}
// function Collection(...args) {
//   Object.setPrototypeOf(args, Collection.prototype)
//   return args
// }
function Rational(numerator = 0n, denominator = 1n) {
  this[0] = numerator
  this[1] = denominator
  Object.freeze(this)
  return this
}
Rational.prototype.constructor = Rational
Rational.prototype = Object.create(Array.prototype)
Rational.prototype.val = tie(val)

function rat(numerator = 0n, denominator = 1n) {
  if (typeof numerator != 'bigint') {
    throw new Error('invalid argument ' + numerator + ' (' + typeof numerator + ')')
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

  index = hashify([numerator, denominator])

  if (numbers[index] === undefined) {
    numbers[index] = new Rational(numerator, denominator)
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
rat.Rational = Rational

module.exports = rat
