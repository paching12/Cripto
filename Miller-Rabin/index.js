// The Miller-Rabin primality test
const { verificarPrimalidad, obtenerNDivisible2 } = require('./utils/functions');
const { SquareMultiply } = require('../Exponentiation/expontiation/utils/functions');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const millerRabin = (n, a, m, k, debug=false) => {
    return verificarPrimalidad(n, a, m, k, debug);
};

const endOdd = [1, 3, 7, 9];
let n = 1000000000 + endOdd[getRandomInt(3)];
let primo = false;
console.log('n original ', n);
for(let i = 0; !primo; i++) {
    const a =  2 + Math.floor(Math.random() * (n-2)) % (n - 4);
    const m = parseInt((n-1)/2);
    const k = obtenerNDivisible2(n-1);
    console.log('probando con', n);
    primo = millerRabin(n, a, m, k, false);
    if( !primo ) {
        n = parseInt(n) + parseInt(2);
    } else {
        console.log('veces corrido el algoritmo', i );
        
        let comprobacion = [];
        for(let i = 0; i < 10; i++) {
            comprobacion.push(millerRabin(n, a, m, k, false));
        }
        const promedio = comprobacion.filter(item => item);
        
        console.log(`${n} es primo`, primo, `veces comprobado ${promedio.length}`);
        console.log(`Valores utilizados a: ${a}, m: ${m}, k: ${k}`)
    }
}
console.log('es primo', n)