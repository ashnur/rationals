void function(root){
    "use strict"

    var numbers = {};

    function isInt(input){
        return typeof input !== 'object' && parseInt(input, 10) == input
    }

    function checkInput(input){
        if ( input instanceof Int32Array && input.byteLength === 8 ) {
            return input
        }
        return rat(input)
    }

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

    function hashify(){
        return this[0]+'/'+this[1]
    }

    function display(){
        return ''+this[0]+(this[1]!=1?'/'+this[1]:'')
    }

    function val(){
        return this[0]/this[1]
    }

    function plus(x){
        x = checkInput(x)
        return rat(this[0]*x[1]+x[0]*this[1], this[1]*x[1])
    }

    function minus(x){
        x = checkInput(x)
        return rat(this[0]*x[1]-x[0]*this[1], this[1]*x[1])
    }

    function times(x){
        x = checkInput(x)
        return rat(this[0]*x[0], this[1]*x[1])
    }

    function per(x){
        x = checkInput(x)
        return rat(this[0]*x[1], x[0]*this[1])
    }

    function rat(numerator, denominator){

        var index, divisor;

        if ( ! isInt(numerator) ) {
            throw new Error('invalid argument '+numerator+' ('+(typeof numerator)+')')
        } else if ( typeof numerator === 'string' ) {
            numerator = parseInt(numerator, 10)
        }

        if ( ! isInt(denominator) ) {
            denominator = 1
        } else if ( typeof denominator === 'string' ) {
            denominator = parseInt(denominator, 10)
        }

        if ( denominator == 0 ) {

            if ( numerator != 0 ) numerator = 1

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

        index = hashify.call([numerator, denominator])

        if ( numbers[index] === undefined ) {
            numbers[index] = new Int32Array(2)
            numbers[index][0] = numerator
            numbers[index][1] = denominator
            numbers[index].toString = hashify
            numbers[index].display = display
            numbers[index].val = val
            numbers[index].plus = plus
            numbers[index].minus = minus
            numbers[index].times = times
            numbers[index].per = per
        }

        return numbers[index]

    }

    rat.isInt = isInt
    rat.checkInput = checkInput
    rat.gcd = gcd

    if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = rat
    } else {
        root.factory = rat
    }

}(this)
