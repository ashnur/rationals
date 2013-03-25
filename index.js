void function(root){
    "use strict"

    var numbers = {}
        , u = require('totemizer')
        , boo = require('boo')
        , rational
        , apply = u.liberate(Function.prototype.apply)
        ;


    function checkInput(input){ return (input && input.init ===  rational.init) ? input : rat(input) }

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
