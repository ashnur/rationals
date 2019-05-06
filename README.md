# rationals
_extended rational number type for javascript_

Basically, each rational number is reduced to normal form, then memoized
so referential equation works, each instance of any rational number will
=== with any other instance of the same rational number, even if they were 
constructed using different inputs.

Of course, if you run out of memory, you run out of memory, but you knew
that when you decided to use BigInt.

I've got the inspiration for this lib from here: [MF105: The extended rational numbers in practice](http://www.youtube.com/watch?v=YMQkLojL2ek)

# Support
[![browser support](https://ci.testling.com/ashnur/rationals.png)](https://ci.testling.com/ashnur/rationals)




# Examples
```
import rat as R from rationals

// denominator of 1 is optional
R(1) === R(1); // true

R(1,1) === R(1); // true

// all rationals will be always reduced
R(2,4) === R(13,26); // true

R(100,50) === R(2); // true

// my personal favorite aproximation of Pi, from ancient china
R(355,113); // 3.1415929203539825

// you can give floats and they will be converted into rationals
fromNumber(0.4,0.1) == rats(4);

```

# API
- _a & b are objects created with the rationals() function_
- in the parentheses you have some common aliases for the methods


#### Addition

    `.add(a, b)`

#### Subtraction

    `.sub(a, b)`

#### Multiplication

    `.mul(a, b)`

#### Division

    `.div(a, b)`

#### Examining
- toString

    Examining an object can be hard, but if you cast it to a string: `r(355,113)+''` will return `'355/113'`.

    So `r(625,125).toString()` will return `'5/1'`.

#### Display
- display

    Just like toString(), but the numerator will be shown only if it's not 1.
    That is, integers will appear without a slash symbol and a denominator.

    `r(625,125).display()` returns `'5'`.

#### Approximation
- val _(value)_

    Will return the numerator divided with the denominator.
    Note that this casts bigints to ints so whatever can happen.

    `r(355,113).val(); //3.1415929203539825`

#### Ordering
- compare _(value)_

    Will return -1, 0 or 1 if the rational is smaller, equal or larger than the rational it is compared to

    `.compare(R(-999,605), R(272,835)) // -1`
    `.compare(R(-966,743), R(-632,198)) // 1`
    `.compare(R(-3,9), R(12,-36)) // 0`

#### Compare absolute values
- compareAbs _(value)_

    Same as compare but without signs.

    `.compare(R(-999,605), R(272,835)) // 1`


# Install
```
npm install rationals
```

**You can use it in the browser with [browserify](http://browserify.org/)**
