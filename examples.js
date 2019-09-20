const rat = require('./index.js')

const R = rat.fromNumber

// denominator of 1 is optional
let o = rat(1n) === R(1) // true
console.log(o)

o = R(1, 1) === rat(1n) // true
console.log(o)

// all rationals will be always reduced
o = rat(2n, 4n) === R(13, 26) // true
console.log(o)

o = R(100, 50) === rat(2n) // true
console.log(o)

// my personal favorite aproximation of Pi, from ancient china
o = R(355, 113).val() // 3.1415929203539825
console.log(o)

// you can give floats and they will be converted into rationals
o = R(0.4, 0.1) == rat(4n)
console.log(o)
