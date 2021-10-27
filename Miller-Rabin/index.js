// The Miller-Rabin primality test

const { verificarPrimalidad, obtenerNDivisible2 } = require('./utils/functions');
const { dec2bin } = require('../Expontiation/expontiation/utils/functions');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const n = 127;//1000000000 + getRandomInt(9);
const a = 31;//1 + getRandomInt(n-1);
const m = parseInt((n-1)/2);
const k = obtenerNDivisible2(n-1);
console.log('k', k, 'm', m, 'a', a);

let primo = verificarPrimalidad(n, a, m, k);
if (primo)
    console.log('n es primo');
else
    console.log('n es compuesto');

// console.log('Número propuesto', n);