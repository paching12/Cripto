const { SquareMultiply, dec2bin } = require('../../Exponentiation/expontiation/utils/functions');

const mod = (n, m) => {
    return ((n % m) + m) % m;
};

const obtenerNDivisible2 = (n, i=0, debug=false) => {
    let nBin = dec2bin(n);
    if (debug)
        console.log(nBin, nBin[nBin.length - 1]);
    if (nBin[nBin.length - 1] === '0') 
        return obtenerNDivisible2(n>>1, ++i, debug);
    return i;
};

const verificarPrimalidad = (n, a, m, k, debugg = false) => {
    let primo = false;

    let b = null;
    b = SquareMultiply(a, m, n);
    if (debugg) {
        console.log(`a^m mod n: ${a}^${m} mod ${n} =`, b);
    }

    if( b === 1 ) {
        if (debugg)
            console.log("*******Es primo********");
        return true;
    } else {
        for(let i = 0; i <= k - 1; i++) {
            if (b == mod(-1, n)) {
                primo = true;
                break;
            }
            else 
                b = SquareMultiply(a, 2, n);
        }

        if (debugg)
            console.log('b', b);
        return primo;
    }
};

module.exports = {
    mod,
    verificarPrimalidad,
    obtenerNDivisible2,
};