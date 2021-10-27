
// Convertir decimal a binario
const dec2bin = (dec) => {
    return (dec >>> 0).toString(2);
}

const mod = (n, m) => {
    return ((n % m) + m) % m;
};

const SquareMultiply = (x, a, n, debug = false) => {
    let z = 1;
    const aBin = dec2bin(a);
    
    // Modo depuración
    if (debug) {
        console.log( 'dec', a, 'bin', aBin );
        console.log('i','\t', 'b', '\t', 'z = z^2', '\t', 'z = X x Z')
    }

    let i = debug ? aBin.length - 1 : undefined;

    for( let binary of aBin ) {
        z = mod(Math.pow(z, 2), n);

        if (debug) {
            if (binary !== '1')
                console.log( i, '\t', binary, '\t', z, '\t' );
            else
                console.log( i, '\t', binary, '\t', z, '\t\t', mod(z * x, n) );
            
            i--;
        }
        
        z = binary === '1' ? mod(z * x, n) : z;    
    }
    return z;
};

module.exports = {
    dec2bin,
    SquareMultiply,
}; 