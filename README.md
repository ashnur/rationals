# rationals
_a small library providing rational number types for javascript_

There are many reasons why rational numbers are the best, I will list two

- Representing fractions is not just easy, but it's natural. This is what
rational numbers do best. Operations like `0.1 + 0.2` are a pain in js,
but using rational numbers, it's just: `r(1,10).plus(1,5) === r(3,10)`

- Now this is not true for any kind of rational numbers, but this lib
provides a type of object which will work with 1/0 or 0/0 just as well.
This is especially useful if you plan to plot values on a graph.

# Examples
```
var rationals = require('rationals');

```

# API
_a & b are objects created with the rationals() function_
- plus
#### Addition
    `a.plus(b)`
- minus
#### Subtraction
    `a.minus(b)`
- times
#### Multiplication
    `a.times(b)`
- per
#### Division
    `a.per(b)`
- toString || hashify
#### Examining
    As *rationals* uses ArrayBuffers by default, examining an object can be hard, but if you cast it to a string: `rational(355,113)+''` will return `'355/113'`
- display
#### Display
    Just like hashify, but the numerator will be shown only if it's not 1. That is, integers will appear without a slash and a denominator.
- val
#### Approximation
    Will return the numerator divided with the denominator.

# Install
```
npm install rationals
```

**You can use it with browserify in the browser**
To be honest, you can use it without browserify too, it's just a module,
but does not uses any kind of external libraries or modules.
But browserify is awesome, so use it.

