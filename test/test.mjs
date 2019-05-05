import fc from 'fast-check'
import test from 'tape'

import rat, { fromNumber } from '../index'
const R = rat

test('R', function(t) {
  t.plan(3)
  t.ok(new R(1n) instanceof R.Rational, 'Is a Rational')
  t.equal(new R(1n).val(), 1n, 'value returns JS Number value')
  t.doesNotThrow(function() {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return BigInt(n) === new R.Rational(BigInt(n)).val()
      }),
    )
  }, 'should construct a new number object, based on input')
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

const zip = (a1, a2) => {
  return a1.map((x, i) => [x, a2[i]])
}

test('common usage', function(t) {
  // it('recognizes decimal numbers, converts them into fractions', function() {
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
      { numRuns: 100000 },
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
        numRuns: 100000,
      },
    )
  })
  // t.doesNotThrow(function() {
  //   fc.assert(
  //     fc.property(RXBRX, function([rx, brx]) {
  //       console.log(rx + '', brx + '')
  //       return rx + '' === brx + ''
  //     }),
  //     { numRuns: 100000 },
  //   )
  // })
  t.end()
})
test('elementary arithmetic', function(t) {
  // it('addition', function() {
  t.equal(rat.add(one, two), three)
  t.equal(rat.add(one, negone), zero)
  t.equal(rat.add(x, y) + '', '18/35')
  // t.doesNotThrow(function() {
  //   fc.assert(
  //     fc.property(X, Y, function(x, y) {
  //       return rat.add(x,y)+'' === big
  //     }),
  //     { numRuns: 100000 },
  //   )
  // })
  // it('subtraction', function() {
  //   t(one.minus(two)).to.be(negone)
  //   t(one.minus(negone)).to.be(two)
  //   t(x.minus(y) + '').to.be('3/35')
  //   t(two.minus(third) + '').to.be('5/3')
  // })
  // it('multiplication', function() {
  //   t(five.times(six)).to.be(thirty)
  //   t(one.times(negone)).to.be(negone)
  //   t(x.times(y) + '').to.be('9/140')
  // })
  // it('division', function() {
  //   t(five.per(ten) + '').to.be('1/2')
  //   t(one.per(negone)).to.be(negone)
  //   t(x.per(y) + '').to.be('7/5')
  // })
  // it('large number calculations', function() {
  //   var x = R(1123875)
  //   var y = R(1238750184)
  //   var z = R(1657134)
  //   var r = R(77344464613500, 92063)
  //   t(x.times(y).per(z)).to.be(r)
  // })
  t.end()
})

// inf = R(1, 0)
// origo = R(0, 0)

// test('operations with infinity and the origo → ', function() {
//   it('adds to ∞', function() {
//     t(inf.add(x)).to.be(inf)
//   })
//   it('adds ∞', function() {
//     t(x.add(inf)).to.be(inf)
//   })
//   it('adds to origo', function() {
//     t(x.add(origo)).to.be(origo)
//   })
//   it('adds origo', function() {
//     t(origo.add(x)).to.be(origo)
//   })

//   it('subtracts from ∞', function() {
//     t(inf.sub(x)).to.be(inf)
//   })
//   it('subtracts ∞', function() {
//     t(x.sub(inf)).to.be(inf)
//   })
//   it('subtracts from origo', function() {
//     t(x.sub(origo)).to.be(origo)
//   })
//   it('subtracts origo', function() {
//     t(origo.sub(x)).to.be(origo)
//   })

//   it('multiplies with ∞', function() {
//     t(inf.mul(x)).to.be(inf)
//   })
//   it('multiplies ∞', function() {
//     t(x.mul(inf)).to.be(inf)
//   })
//   it('multiplies with origo', function() {
//     t(x.mul(origo)).to.be(origo)
//   })
//   it('multiplies origo', function() {
//     t(origo.mul(x)).to.be(origo)
//   })

//   it('divides with ∞', function() {
//     t(inf.per(x)).to.be(inf)
//   })
//   it('divides ∞', function() {
//     t(x.div(inf)).to.be(zero)
//   })
//   it('divides with origo', function() {
//     t(x.div(origo)).to.be(origo)
//   })
//   it('divides origo', function() {
//     t(origo.div(x)).to.be(origo)
//   })
// })

// test('compare rational numbers', function() {
//   it('returns -1, 0 or 1 if a is smaller, equal or larger than b', function() {
//     t(R(-999, 605).compare(R(272, 835))).to.be(-1)
//     t(R(-966, 743).compare(R(-632, 198))).to.be(1)
//     t(R(-3, 9).compare(R(12, -36))).to.be(0)
//     t(R(742, -185).compare(R(319, -830))).to.be(-1)
//     t(R(-999, 605).compareAbs(R(272, 835))).to.be(1)
//   })
// })
