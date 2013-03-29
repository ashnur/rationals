void function(root){
    "use strict"

    var numbers = {}
        , u = require('totemizer')
        , boo = require('boo')
        , rational
        , apply = u.liberate(Function.prototype.apply)
        , big = require('biginteger').BigInteger
        ;


    function checkInput(input){ return (input && input.init ===  rational.init) ? input : rat(input) }

    function gcd(a, b){
        var t;
        a = a.abs()
        b = b.abs()
        while (b.isPositive()) {
            t = b
            b = a.remainder(b)
            a = t
        }
        return a
    }

    function lcm(a, b){ return (a.multiply(b)).abs().divide(gcd(a,b)) }

    function hashify(r){ return r[0]+'/'+r[1] }

    function display(r){ return ''+r[0]+(r[1]!=1?'/'+r[1]:'') }

    function val(r){ return r[0].toJSValue()/r[1].toJSValue() }

    function add(x, y){ return rat(x[0].multiply(y[1]).add(y[0].multiply(x[1])), x[1].multiply(y[1])) }

    function subtract(x, y){ return rat(x[0].multiply(y[1]).subtract(y[0].multiply(x[1])), x[1].multiply(y[1])) }

    function multiply(x, y){ return rat(x[0].multiply(y[0]), x[1].multiply(y[1])) }

    function divide(x, y){ return rat(x[0].multiply(y[1]), x[1].multiply(y[0])) }

    rational = boo.Base.derive({
        init : function(numerator, denominator){
            this[0] = numerator
            this[1] = denominator
        }
        , toString : u.enslave(hashify)
        , display : u.enslave(display)

        , val : u.enslave(val)

        , add : u.enslave(add)
        , plus : u.enslave(add)

        , subtract : u.enslave(subtract)
        , minus : u.enslave(subtract)
        , sub: u.enslave(subtract)

        , multiply : u.enslave(multiply)
        , times : u.enslave(multiply)
        , mul: u.enslave(multiply)

        , divide : u.enslave(divide)
        , per : u.enslave(divide)
        , div: u.enslave(divide)

    })

    function rat(numerator, denominator){

        var index, divisor;

        if ( ! u.isInt(numerator) ) {
            throw new Error('invalid argument '+numerator+' ('+(typeof numerator)+')')
        } else {
            numerator = big(numerator)
        }

        if ( ! u.isInt(denominator) ) {
            denominator = big.ONE
        } else {
            denominator = big(denominator)
        }

        if ( denominator.isZero() ) {

            if ( ! numerator.isZero() ) numerator = big.ONE

        } else {

            divisor = gcd(numerator, denominator)
            if ( ! divisor.isUnit()  ) {
                numerator = numerator.divide(divisor)
                denominator = denominator.divide(divisor)
            }

            if ( denominator.isNegative() ) {
                numerator = numerator.negate()
                denominator = denominator.negate()
            }
        }

        index = hashify([numerator, denominator])

        if ( numbers[index] === undefined ) {
            numbers[index] = rational.make(numerator, denominator)
        }

        return numbers[index]

    }

    rat.checkInput = checkInput
    rat.gcd = function(a, b){ return rat(gcd(a[0],b[0]), lcm(a[1],b[1])) }
    rat.lcm = function(a, b){ return rat(lcm(a[0],b[0]), gcd(a[1],b[1])) }
    rat.add = add
    rat.div = divide
    rat.sub = subtract
    rat.mul = multiply

    if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = rat
    } else {
        root.factory = rat
    }

}(this)
