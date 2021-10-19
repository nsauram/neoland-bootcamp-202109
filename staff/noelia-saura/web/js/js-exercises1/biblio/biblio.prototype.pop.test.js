// TODO

describe('TEST pop')

describe('case 1')

var array = new Biblio('broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato')
var res = array.pop()

if (
    typeof res === 'string'
    && res === 'tomato'
    && array.length === 4
    && array[0] === 'broccoli'
    && array[1] === 'cauliflower'
    && array[2] === 'cabbage'
    && array[3] === 'kale'
)
    success('test ok')
else
    fail('test ko')

describe('case 2')

var array = new Biblio()
var res = array.pop()

if (typeof res === 'undefined'
    && res === undefined
    && array.length === 0)
    success('test ok')
else
    fail('test ko')

describe('case 3')

var object = { name: 'Peter' }
var func = function() {}
var arr = [1, 2, 3]
var array = new Biblio(null, undefined, true, 1, func, arr, NaN, Infinity, Math.PI, object)
var res = array.pop()

if (typeof res === 'object'
    && res === object
    && array.length === 9
    && array[0] === null
    && array[1] === undefined
    && array[2] === true
    && array[3] === 1
    && array[4] === func
    && array[5] === arr
    && Number.isNaN(array[6])
    && array[7] === Infinity
    && array[8] === Math.PI) // this doesn't work => array[6] === NaN
    success('test ok')
else
    fail('test ko')