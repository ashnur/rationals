void function(root){
    'use strict'

    var util = Object.create(null);

    util.liberate = Function.prototype.bind.bind(Function.prototype.call)

    util.detach = Function.prototype.bind.bind(Function.prototype.apply)

    util.slice = util.liberate(Array.prototype.slice)

    util.times = function(nr, fun) {
        var result = []
            , i
            ;
        for ( i = 0; i < nr; i++) { result.push(fun(i)) }
        return result
    }

    util.longest = function(){
        var args = util.slice(arguments)
            , result = []
            ;

        util.times(args.length, function(i){
            var arr = args[i];
            result = args[i] ? (result.length > args[i].length ? result : args[i]) : []
        })
        return result
    }

    util.span = function(init, limit, stepper) {

        var list = []
            ,i = init.valueOf()
            , continuePred
            ;

        stepper = stepper || function (x) { return x + 1; }

        continuePred = (stepper(i) > i) ? function (x) { return x <= limit }
                                        :  function (x) { return x >= limit }

        while (continuePred(i)) {
            list.push(i)
            i = stepper(i)
        }

        return list
    }

    util.zipWith = function(){
        var fxn = arguments[0]
            , args = util.slice(arguments,1)
            , output = []
            , width = Math.max.apply(null, args.map(function(xs){ return xs ? (xs.length || 0) : 0 }))
            , i
            ;

        for (i = 0; i < width; i++) {
            output.push(fxn.apply(null, [].map.call(args, function(xs) {
                return xs ? xs[i] : []
            })))
        }
        return output
    }

    util.zipWithArray = function(funct, argsArray){
        return util.zipWith.apply(null,[funct].concat(argsArray))
    }

    util.zip = util.zipWith.bind(null, function(){return util.slice(arguments)})

    util.partition = function(arr, length){

        var result, each;

        if (length === undefined || length <= 0) { return [] }

        result = []
        each   = []

        arr.forEach(function (value) {

            each.push(value)

            if (each.length === length) {
                result.push(each)
                each = []
            }

        })

        return result.concat(each.length > 0 ? [ each ] : [])
    }

    util.arrayMax = function(arr) { return Math.max.apply(null, arr) }

    util.isInt = function(v){ return v % 1 === 0 }

    util.allIntegers = function(arr){ return arr.every(util.isInt) }

    util.indexOfMax = function(arr){
        return arr.reduce(function (m, e, i, a) { return (m==-1 || e > a[m]) ? i : m }, -1)
    }

    util.indexOfAbsMax = function(arr){
        return arr.reduce(function (m, e, i, a) { return (m==-1 || Math.abs(e) > Math.abs(a[m])) ? i : m }, -1)
    }

    util.bind = function(fn){
        var args = util.slice(arguments, 1);
        return function(){
            var args2 = util.slice(arguments);
            return fn.apply(this, args.concat(args2))
        }
    }

    util.enslave = function (fn) {
        return function(){
            return fn.bind(null, this).apply(null, arguments)
        }
    }

    if ( module !== undefined && module.exports ) {
        module.exports = util
    } else {
        root.vatrix = util
    }
}(this)
