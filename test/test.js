const fc = require('fast-check')
const R = require('../')

const test = require('tape')

test('R', function(assert) {
  assert.plan(3)
  assert.ok(new R(1n) instanceof R.Rational, 'Is a Rational')
  assert.equal(new R(1n).val(), 1n, 'value returns JS Number value')
  assert.doesNotThrow(function() {
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

// describe('common usage', function() {
//   it('recognizes decimal numbers, converts them into fractions', function() {
//     expect(R(0.5)).to.be(R(1, 2))
//     expect(R(0.33)).to.be(R(33, 100))
//     expect(R(0.4, 0.1)).to.be(R(4))
//   })
// })
// describe('elementary arithmetic', function() {
//   it('addition', function() {
//     expect(one.plus(two)).to.be(three)
//     expect(one.plus(negone)).to.be(zero)
//     expect(x.plus(y) + '').to.be('18/35')
//   })
//   it('subtraction', function() {
//     expect(one.minus(two)).to.be(negone)
//     expect(one.minus(negone)).to.be(two)
//     expect(x.minus(y) + '').to.be('3/35')
//     expect(two.minus(third) + '').to.be('5/3')
//   })
//   it('multiplication', function() {
//     expect(five.times(six)).to.be(thirty)
//     expect(one.times(negone)).to.be(negone)
//     expect(x.times(y) + '').to.be('9/140')
//   })
//   it('division', function() {
//     expect(five.per(ten) + '').to.be('1/2')
//     expect(one.per(negone)).to.be(negone)
//     expect(x.per(y) + '').to.be('7/5')
//   })
//   it('large number calculations', function() {
//     var x = R(1123875)
//     var y = R(1238750184)
//     var z = R(1657134)
//     var r = R(77344464613500, 92063)
//     expect(x.times(y).per(z)).to.be(r)
//   })
// })

// inf = R(1, 0)
// origo = R(0, 0)

// describe('operations with infinity and the origo → ', function() {
//   it('adds to ∞', function() {
//     expect(inf.add(x)).to.be(inf)
//   })
//   it('adds ∞', function() {
//     expect(x.add(inf)).to.be(inf)
//   })
//   it('adds to origo', function() {
//     expect(x.add(origo)).to.be(origo)
//   })
//   it('adds origo', function() {
//     expect(origo.add(x)).to.be(origo)
//   })

//   it('subtracts from ∞', function() {
//     expect(inf.sub(x)).to.be(inf)
//   })
//   it('subtracts ∞', function() {
//     expect(x.sub(inf)).to.be(inf)
//   })
//   it('subtracts from origo', function() {
//     expect(x.sub(origo)).to.be(origo)
//   })
//   it('subtracts origo', function() {
//     expect(origo.sub(x)).to.be(origo)
//   })

//   it('multiplies with ∞', function() {
//     expect(inf.mul(x)).to.be(inf)
//   })
//   it('multiplies ∞', function() {
//     expect(x.mul(inf)).to.be(inf)
//   })
//   it('multiplies with origo', function() {
//     expect(x.mul(origo)).to.be(origo)
//   })
//   it('multiplies origo', function() {
//     expect(origo.mul(x)).to.be(origo)
//   })

//   it('divides with ∞', function() {
//     expect(inf.per(x)).to.be(inf)
//   })
//   it('divides ∞', function() {
//     expect(x.div(inf)).to.be(zero)
//   })
//   it('divides with origo', function() {
//     expect(x.div(origo)).to.be(origo)
//   })
//   it('divides origo', function() {
//     expect(origo.div(x)).to.be(origo)
//   })
// })

// describe('compare rational numbers', function() {
//   it('returns -1, 0 or 1 if a is smaller, equal or larger than b', function() {
//     expect(R(-999, 605).compare(R(272, 835))).to.be(-1)
//     expect(R(-966, 743).compare(R(-632, 198))).to.be(1)
//     expect(R(-3, 9).compare(R(12, -36))).to.be(0)
//     expect(R(742, -185).compare(R(319, -830))).to.be(-1)
//     expect(R(-999, 605).compareAbs(R(272, 835))).to.be(1)
//   })
// })
