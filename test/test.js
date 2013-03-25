var rats = require('../')
    , expect = require('expect.js')
    , five, negone, one, six, ten, third, thirty, three, two, x, y, zero
    , inf, origo
    ;

describe("rats", function() {

    it("should construct a new number object, based on input", function() {
        expect(rats(1)).to.be.an('object')
        expect(rats(1).val()).to.be(1)
        expect(rats.checkInput(rats(1))).to.be(rats(1))
    })

})

negone = rats(-1)
zero = rats(0)
one = rats(1)
two = rats(2)
three = rats(3)
five = rats(5)
six = rats(6)
ten = rats(10)
thirty = rats(30)
x = rats(3, 10)
y = rats(3, 14)
third = rats(1, 3)


describe('elementary arithmetic', function() {
    it('addition', function() {
        expect(one.plus(two)).to.be(three)
        expect(one.plus(negone)).to.be(zero)
        expect(x.plus(y)+'').to.be('18/35')
    })
    it('subtraction', function() {
        expect(one.minus(two)).to.be(negone)
        expect(one.minus(negone)).to.be(two)
        expect(x.minus(y)+'').to.be('3/35')
        expect(two.minus(third)+'').to.be('5/3')
    })
    it('multiplication', function() {
        expect(five.times(six)).to.be(thirty)
        expect(one.times(negone)).to.be(negone)
        expect(x.times(y)+'').to.be('9/140')
    })
    it('division', function() {
        expect(five.per(ten)+'').to.be('1/2')
        expect(one.per(negone)).to.be(negone)
        expect(x.per(y)+'').to.be('7/5')
    })

})

inf = rats(1,0)
origo = rats(0,0)

describe('operations with infinity and the origo → ', function() {

    it('adds to ∞', function(){
        expect(inf.add(x)).to.be(inf)
    })
    it('adds ∞', function(){
        expect(x.add(inf)).to.be(inf)
    })
    it('adds to origo', function(){
        expect(x.add(origo)).to.be(origo)
    })
    it('adds origo', function(){
        expect(origo.add(x)).to.be(origo)
    })

    it('subtracts from ∞', function(){
        expect(inf.sub(x)).to.be(inf)
    })
    it('subtracts ∞', function(){
        expect(x.sub(inf)).to.be(inf)
    })
    it('subtracts from origo', function(){
        expect(x.sub(origo)).to.be(origo)
    })
    it('subtracts origo', function(){
        expect(origo.sub(x)).to.be(origo)
    })

    it('multiplies with ∞', function(){
        expect(inf.mul(x)).to.be(inf)
    })
    it('multiplies ∞', function(){
        expect(x.mul(inf)).to.be(inf)
    })
    it('multiplies with origo', function(){
        expect(x.mul(origo)).to.be(origo)
    })
    it('multiplies origo', function(){
        expect(origo.mul(x)).to.be(origo)
    })

    it('divides with ∞', function(){
        expect(inf.per(x)).to.be(inf)
    })
    it('divides ∞', function(){
        expect(x.div(inf)).to.be(zero)
    })
    it('divides with origo', function(){
        expect(x.div(origo)).to.be(origo)
    })
    it('divides origo', function(){
        expect(origo.div(x)).to.be(origo)
    })

})
