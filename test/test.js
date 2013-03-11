describe("rats", function() {
    var rats;
    rats = require('../')
    expect = require('expect.js')
    it("should be a function", function() {
            expect(rats).to.be.a('function')
    })
    it("should construct a new number object, based on input", function() {
        var one;
        one = rats(1)
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
            describe('innings', function(){
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
            describe('plus', function() {
                return it('should add two numbers', function() {
                    var control, result;
                    debugger
                    result = one.plus(two)
                    if (result !== three) {
                        throw new Error('method plus is broken, 1+2 != ' + three)
                    }
                    result = one.plus(negone)
                    if (result !== zero) {
                        throw new Error('method plus is broken, 1+(-1) != ' + zero)
                    }
                    result = x.plus(y)
                    control = '18/35'

                    if (result.toString() !== control) {
                        throw new Error('method plus is broken, (3/10)-(3/14) != ' + control + '(' + result + ')')
                    }
                })
            })
            describe('minus', function() {
                return it('should negate two numbers', function() {
                    var control, result;
                    result = one.minus(two)
                    if (result !== negone) {
                        throw new Error('method minus is broken, 1-2 != ' + negone)
                    }
                    result = one.minus(negone)
                    if (result !== two) {
                        throw new Error('method minus is broken, 1-(-1) != ' + two)
                    }
                    result = x.minus(y)
                    control = '3/35'
                    if (result.toString() !== control) {
                        throw new Error('method minus is broken, (3/10)+(3/14) != ' + control)
                    }
                })
            })
            describe('times', function() {
                return it('should multiply two numbers', function() {
                    var control, result;
                    result = five.times(six)
                    if (result !== thirty) {
                        throw new Error('method times is broken, 5*6 != ' + thirty)
                    }
                    result = one.times(negone)
                    if (result !== negone) {
                        throw new Error('method times is broken, 1*(-1) != ' + negone)
                    }
                    result = x.times(y)
                    control = '9/140'
                    if (result.toString() !== control) {
                        throw new Error('method times is broken, (3/10)*(3/14) != ' + control)
                    }
                })
            })
            describe('per', function() {
                it('should divide two numbers', function() {
                    var control, result;
                    result = five.per(ten)
                    if (result.toString() !== '1/2') {
                        throw new Error('method per is broken, 5/10 != 1/2')
                    }
                    debugger
                    result = one.per(negone)
                    if (result !== negone) {
                        throw new Error('method per is broken, 1/(-1) != ' + negone)
                    }
                    result = x.per(y)
                    control = '7/5'
                    if (result.toString() !== control) {
                        throw new Error('method per is broken, (3/10)/(3/14) != ' + control)
                    }
                })
                return it('should subtract rat from nat', function() {
                    var control, result;
                    result = two.minus(third)
                    control = '5/3'
                    if (result.toString() !== control) {
                        throw new Error('method per is broken, 2-1/3 != ' + control + '(' + result + ')')
                    }
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
