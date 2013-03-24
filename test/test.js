describe("rats", function() {
    var rats = require('../')
        , expect = require('expect.js')
        ;

    it("should be a function", function() { expect(rats).to.be.a('function') })

    it("should construct a new number object, based on input", function() {
        var one = rats(1);
        if (typeof one !== 'object') {
            throw new Error('unexpected construct: ' + typeof one)
        } else if (one.val() !== 1) {
            throw new Error('unexpected value of construct: ' + one)
        } else {
            return true
        }
    })

    function test(a, b, operation, expect, message){
        if ( operation.call(a,b) != expect ) throw new Error(message)
    }

    return describe('number object', function() {
        var five, negone, one, six, ten, third, thirty, three, two, x, y, zero;
        it ('should init', function(){
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
            describe('elementary operations', function(){
                it('should have a `plus` method', function() {
                    if (typeof one.plus !== 'function') {
                        throw new Error('number obj is corrupted, method plus is: ' + typeof one.plus)
                    }
                })
                it('should have a `minus` method', function() {
                    if (typeof one.minus !== 'function') {
                        throw new Error('number obj is corrupted, method minus is: ' + typeof one.minus)
                    }
                })
                it('should have a `times` method', function() {
                    if (typeof one.times !== 'function') {
                        throw new Error('number obj is corrupted, method times is: ' + typeof one.times)
                    }
                })
                it('should have a `per` method', function() {
                    if (typeof one.per !== 'function') {
                        throw new Error('number obj is corrupted, method per is: ' + typeof one.per)
                    }
                })
            })
            describe('elementary arithmetic', function() {
                it('should add two numbers', function() {
                    expect(one.plus(two)).to.be(three)
                    expect(one.plus(negone)).to.be(zero)
                    expect(x.plus(y)+'').to.be('18/35')
                })
                it('should negate two numbers', function() {
                    expect(one.minus(two)).to.be(negone)
                    expect(one.minus(negone)).to.be(two)
                    expect(x.minus(y)+'').to.be('3/35')
                })
                it('should multiply two numbers', function() {
                    expect(five.times(six)).to.be(thirty)
                    expect(one.times(negone)).to.be(negone)
                    expect(x.times(y)+'').to.be('9/140')
                })
                it('should divide two numbers', function() {
                    expect(five.per(ten)+'').to.be('1/2')
                    expect(one.per(negone)).to.be(negone)
                    expect(x.per(y)+'').to.be('7/5')
                })
                it('should subtract rat from nat', function() {
                    expect(two.minus(third)+'').to.be('5/3')
                })
            })
            describe('operations on inf too', function() {
                var inf = rats(1,0)
                    , origo = rats(0,0)
                    ;


                it('addition', function(){
                    test( inf, x, inf.plus, inf, 'adding to ∞ is flawed')
                    test( x, inf, x.plus, inf, 'addition with ∞ is flawed')
                    test( origo, x, origo.plus, origo, 'adding to origo is flawed')
                    test( x, origo, x.plus, origo, 'addition with origo is flawed')
                })

                it('negation', function(){
                    test( inf, x, inf.minus, inf, 'negation from ∞ is flawed')
                    test( x, inf, x.minus, inf, 'negating with ∞ is flawed')
                    test( origo, x, origo.minus, origo, 'negation from origo is flawed')
                    test( x, origo, x.minus, origo, 'negating to origo is flawed')
                })

                it('multiplication', function(){
                    test( x, inf, x.minus, inf, 'multiplication with ∞ is flawed')
                    test( inf, x, inf.times, inf, 'multiplicating ∞ is flawed')
                    test( x, origo, x.times, origo, 'multiplication with origo is flawed')
                    test( origo, x, origo.times, origo, 'multiplicating origo is flawed')
                })

                it('division', function(){
                    test( x, inf, x.per, zero, 'dividing with ∞ is flawed')
                    test( inf, x, inf.per, inf, 'dividing ∞ is flawed')
                    test( x, origo, x.per, origo, 'dividing with origo is flawed')
                    test( origo, x, origo.per, origo, 'dividing origo is flawed')
                })

            })
        })
    })
})
