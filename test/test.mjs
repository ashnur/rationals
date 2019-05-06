import fc from 'fast-check'
import test from 'tape'

import rat, { fromString, fromNumber } from '../index'
const R = rat

const numRunsL = 500
const numRunsH = 50000
const numRuns = numRunsL

test('R', function(t) {
  // t.ok(new R(1n) instanceof R.ExtendedRational, 'Is a Rational')
  t.equal(R(1n).val(), 1, 'value returns JS Number value')
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return Number(n) === R(BigInt(n)).val()
      }),
    )
  }, 'should construct a new number object, based on input')
  t.end()
})

const negone = R(-1n)
const zero = R(0n)
const one = R(1n)
const two = R(2n)
const three = R(3n)
const five = R(5n)
const six = R(6n)
const ten = R(10n)
const thirty = R(30n)
const x = R(3n, 10n)
const y = R(3n, 14n)
const third = R(1n, 3n)

let b = 15
const nl = fc.array(fc.nat(9), 100)
const rbi = nl.map((arr) => {
  return arr.reduce((r, n, i) => r + BigInt(n) * 10n ** (BigInt(i) + 1n), 0n)
})

const r = fc.tuple(rbi, rbi).map(([n, d]) => R(n, d))

const zip = (a1, a2) => {
  return a1.map((x, i) => [x, a2[i]])
}

const ONE = fc.constant(one)
const NegONE = fc.constant(negone)
const ZERO = fc.constant(zero)

test('common usage', function(t) {
  // test('recognizes decimal numbers, converts them into fractions', function() {
  t.equal(fromNumber(0.5), R(1n, 2n))
  t.equal(fromNumber(0.33), R(33n, 100n))
  t.equal(fromNumber(0.4, 0.1), R(4n))
  t.equal(fromNumber(128394130455127, 1), R(128394130455127n))
  t.equal(fromNumber(125000031793307, 1), R(125000031793307n))

  t.doesNotThrow(function() {
    fc.assert(
      fc.property(fc.integer(0, Math.floor(Number.MAX_SAFE_INTEGER / 10)), fc.integer(0, 15), function(value, shift) {
        // if shift larger than value length, use
        const exp = 10 ** Math.max(value.toString(10).length, shift)
        return fromNumber(value, exp) === R(BigInt(value), BigInt(exp))
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(fc.integer(0, Math.floor(Number.MAX_SAFE_INTEGER / 10)), fc.integer(0, 15), function(value, shift) {
        // if shift larger than value length, use
        const exp = 10 ** Math.max(value.toString(10).length, shift)
        return fromNumber(value, exp) === R(BigInt(value), BigInt(exp))
      }),
      {
        seed: 1819253937,
        path: '89:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0',
        endOnFailure: true,
        numRuns: numRuns,
      },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(fc.tuple(rbi, rbi).map(([x, y]) => [x, y, x + '', y + '']), function([x, y, strX, strY]) {
        return fromString(strX, strY) === R(x, y)
      }),
      { numRuns: numRuns },
    )
  })
  t.end()
})
test('elementary arithmetic', function(t) {
  // test('addition', function() {
  t.equal(rat.add(one, two), three)
  t.equal(rat.add(one, negone), zero)
  t.equal(rat.add(x, y) + '', '18/35')
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(ZERO, r, function(z, x) {
        return z === zero && rat.add(z, x) === x && x === rat.add(x, z)
      }),
      { numRuns: numRuns },
    )
  })
  // Commutativity
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, function(x, y) {
        return rat.add(x, y) === rat.add(y, x)
      }),
      { numRuns: numRuns },
    )
  })

  // Associativity
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.add(rat.add(x, y), z) === rat.add(x, rat.add(y, z))
      }),
      { numRuns: numRuns },
    )
  })

  // ('subtraction', function() {
  t.equal(rat.sub(one, two), negone)
  t.equal(rat.sub(one, negone), two)
  t.equal(rat.sub(x, y) + '', '3/35')
  t.equal(rat.sub(two, third) + '', '5/3')

  t.doesNotThrow(function() {
    fc.assert(
      fc.property(ZERO, r, function(z, x) {
        return z === zero && x === rat.sub(x, z)
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(ZERO, r, function(z, x) {
        return z === zero && x === rat.sub(x, z)
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        const rez = rat.add(x, rat.sub(y, z)) === rat.sub(rat.add(x, y), z)
        return rez
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        const rez = rat.sub(x, rat.add(y, z)) === rat.sub(rat.sub(x, y), z)
        return rez
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        const rez = rat.sub(x, rat.sub(y, z)) === rat.add(rat.sub(x, y), z)
        return rez
      }),
      { numRuns: numRuns },
    )
  })
  t.end()
})

const inf = R(1n, 0n)
const origo = R(0n, 0n)
const INF = fc.constant(inf)
const ORIGO = fc.constant(origo)
const nfoz = r.filter((x) => x !== origo && x !== inf && x !== zero)

test('adds ', function(t) {
  t.equal(rat.add(inf, x), inf)
  t.equal(rat.add(x, inf), inf)
  t.equal(rat.add(x, origo), origo)
  t.equal(rat.add(origo, x), origo)
  t.doesNotThrow(function() {
    fc.assert(fc.property(nfoz, INF, (x, inf) => rat.add(inf, x) === inf), { numRuns })
    fc.assert(fc.property(nfoz, INF, (x, inf) => rat.add(x, inf) === inf), { numRuns })
    fc.assert(fc.property(nfoz, ORIGO, (x, origo) => rat.add(x, origo) === origo), { numRuns })
    fc.assert(fc.property(nfoz, ORIGO, (x, origo) => rat.add(origo, x) === origo), { numRuns })
  })
  t.end()
})

test('subtracts ', function(t) {
  t.equal(rat.sub(inf, x), inf)
  t.equal(rat.sub(x, inf), inf)
  t.equal(rat.sub(x, origo), origo)
  t.equal(rat.sub(origo, x), origo)
  t.doesNotThrow(function() {
    fc.assert(fc.property(nfoz, INF, (x, inf) => rat.sub(inf, x) === inf), { numRuns })
    fc.assert(fc.property(nfoz, INF, (x, inf) => rat.sub(x, inf) === inf), { numRuns })
    fc.assert(fc.property(nfoz, ORIGO, (x, origo) => rat.sub(x, origo) === origo), { numRuns })
    fc.assert(fc.property(nfoz, ORIGO, (x, origo) => rat.sub(origo, x) === origo), { numRuns })
  })
  t.end()
})

test('multiplies ', function(t) {
  t.equal(rat.mul(inf, x), inf)
  t.equal(rat.mul(x, inf), inf)
  t.equal(rat.mul(x, origo), origo)
  t.equal(rat.mul(origo, x), origo)
  t.doesNotThrow(function() {
    fc.assert(fc.property(nfoz, INF, (x, inf) => rat.mul(inf, x) === inf), { numRuns })
    fc.assert(fc.property(nfoz, INF, (x, inf) => rat.mul(x, inf) === inf), { numRuns })
    fc.assert(fc.property(nfoz, ORIGO, (x, origo) => rat.mul(x, origo) === origo), { numRuns })
    fc.assert(fc.property(nfoz, ORIGO, (x, origo) => rat.mul(origo, x) === origo), { numRuns })
  })
  t.end()
})

test('divides ', function(t) {
  t.equal(rat.div(inf, x), inf)
  t.equal(rat.div(x, inf), zero)
  t.equal(rat.div(x, origo), origo)
  t.equal(rat.div(origo, x), origo)
  t.end()
})

test('compare rational numbers', function(t) {
  // test('returns -1, 0 or 1 if a is smaller, equal or larger than b', function() {
  t.equal(rat.compare(R(-999n, 605n), R(272n, 835n)), -1)
  t.equal(rat.compare(R(-966n, 743n), R(-632n, 198n)), 1)
  t.equal(rat.compare(R(-3n, 9n), R(12n, -36n)), 0)
  t.equal(rat.compare(R(742n, -185n), R(319n, -830n)), -1)
  t.equal(rat.compareAbs(R(-999n, 605n), R(272n, 835n)), 1)
  // })
  t.end()
})

test('Distributivity', function(t) {
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.mul(rat.mul(x, y), z) === rat.mul(x, rat.mul(y, z))
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.scale(rat.height(x), rat.mul(x, rat.add(y, z))) === rat.add(rat.mul(x, y), rat.mul(x, z))
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.scale(rat.height(z), rat.mul(rat.add(x, y), z)) === rat.add(rat.mul(x, z), rat.mul(y, z))
      }),
      { numRuns: numRuns },
    )
  })
  t.end()
})
//assoc
test('associative laws', function(t) {
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.mul(x, rat.div(y, z)) === rat.div(rat.mul(x, y), z)
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.div(x, rat.div(y, z)) === rat.mul(rat.div(x, y), z)
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.div(x, rat.mul(y, z)) === rat.div(rat.div(x, y), z)
      }),
      { numRuns: numRuns },
    )
  })
  t.end()
})

test('more distributive laws', function(t) {
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.scale(rat.height(x), rat.mul(x, rat.sub(y, z))) === rat.sub(rat.mul(x, y), rat.mul(x, z))
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.scale(rat.height(z), rat.mul(rat.sub(x, y), z)) === rat.sub(rat.mul(x, z), rat.mul(y, z))
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.scale(rat.width(z), rat.div(rat.add(x, y), z)) === rat.add(rat.div(x, z), rat.div(y, z))
      }),
      { numRuns: numRuns },
    )
  })
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(r, r, r, function(x, y, z) {
        return rat.scale(rat.width(z), rat.div(rat.sub(x, y), z)) === rat.sub(rat.div(x, z), rat.div(y, z))
      }),
      { numRuns: numRuns },
    )
  })
  t.end()
})
test('simple multiplication', function(t) {
  t.equal(rat.mul(five, six), thirty)
  t.equal(rat.mul(one, negone), negone)
  t.equal(rat.mul(x, y) + '', '9/140')
  t.end()
})
test('simple division', function(t) {
  t.equal(rat.div(five, ten) + '', '1/2')
  t.equal(rat.div(one, negone), negone)
  t.equal(rat.div(x, y) + '', '7/5')
  t.end()
})
test('large number calculations', function(t) {
  var x = R(1123875n)
  var y = R(1238750184n)
  var z = R(1657134n)
  var r = R(77344464613500n, 92063n)
  t.equal(rat.div(rat.mul(x, y), z), r)
  t.end()
})
