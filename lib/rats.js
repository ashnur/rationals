void function(root){
    "use strict"

    var numbers = {}
        , u = require('totemizer')
        , boo = require('boo')
        , rational
        , apply = u.liberate(Function.prototype.apply)
        ;


    function checkInput(input){ return input instanceof rational ? input : rat(input) }

    function gcd(a, b){
        var t;
        a = Math.abs(a)
        b = Math.abs(b)
        while (b > 0) {
            t = b
            b = a % b
            a = t
        }
        return a
    }

    function lcm(a, b){ return Math.abs(a*b)/gcd(a,b) }

    function hashify(r){ return r[0]+'/'+r[1] }

    function display(r){ return ''+r[0]+(r[1]!=1?'/'+r[1]:'') }

    function val(r){ return r[0]/r[1] }

    function add(x, y){ return rat(x[0]*y[1]+y[0]*x[1], x[1]*y[1]) }

    function subtract(x, y){ return rat(x[0]*y[1]-y[0]*x[1], x[1]*y[1]) }

    function multiply(x, y){ return rat(x[0]*y[0], x[1]*y[1]) }

    function divide(x, y){ return rat(x[0]*y[1], y[0]*x[1]) }

    rational = boo.Base.derive(Array, {
        init : function(numerator, denominator){
            this[0] = numerator
            this[1] = denominator
        }
        , toString : function(){ return hashify(this) }
        , display : function(){ return display(this) }

        , val : function(){ return val(this) }

        , add : function(y){ return add(this, y) }
        , plus : function(y){ return add(this, y) }

        , subtract : function(y){ return subtract(this, y) }
        , minus : function(y){ return subtract(this, y) }
        , sub: function(y){ return subtract(this, y) }

        , multiply : function(y){ return multiply(this, y) }
        , times : function(y){ return multiply(this, y) }
        , mul: function(y){ return multiply(this, y) }

        , divide : function(y){ return divide(this, y) }
        , per : function(y){ return divide(this, y) }
        , div: function(y){ return divide(this, y) }

    })

    function rat(numerator, denominator){

        var index, divisor;

        if ( ! u.isInt(numerator) ) {
            throw new Error('invalid argument '+numerator+' ('+(typeof numerator)+')')
        } else if ( typeof numerator === 'string' ) {
            numerator = Number(numerator)
        }

        if ( ! u.isInt(denominator) ) {
            denominator = 1
        } else if ( typeof denominator === 'string' ) {
            denominator = Number(denominator)
        }

        if ( denominator === 0 ) {

            if ( numerator !== 0 ) numerator = 1

        } else {

            divisor = gcd(numerator, denominator)
            if ( Math.abs(divisor) > 1 ) {
                numerator = numerator / divisor
                denominator = denominator / divisor
            }

            if ( denominator < 0 ) {
                numerator *= -1
                denominator *= -1
            }
        }

        index = hashify([numerator, denominator])

        if ( numbers[index] === undefined ) {
            numbers[index] = rational.make(numerator, denominator)
        }

        return numbers[index]

    }

    rat.checkInput = checkInput
    rat.gcd = gcd
    rat.lcm = lcm

    if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = rat
    } else {
        root.factory = rat
    }

}(this)
