const mod = (n, m) => {
    return ((n % m) + m) % m;
};

const euclides = (divisor, dividendo, qs = []) => {
    const residuo = dividendo % divisor;
    if (!residuo == 0) {
        try {
            if(Array.isArray(qs))
               qs.push(parseInt(dividendo/divisor));
            return euclides(residuo, divisor, qs);
        } catch (e) {
            console.error("Ha ocurrido una excepción....", e);
        }
    }
    qs.push(divisor);
    return qs;
};

const obtenerInversoMultiplicativo = (t = [0,1], qs = [], r0 = 0, i = 2, debug = false) => {
    
    t[i] =  parseInt(t[i - 2]) - parseInt(qs[i - 1] * t[i - 1]);
    
    if (debug) {
        console.log( 't[i-2]', parseInt(t[i - 2]), 'qs[i - 1]', qs[i - 1], '*', t[i - 1], '=', t[i]);
        console.log(t[i], 'mod', r0, '=', mod(t[i], r0));
    }

    t[i] = mod(t[i], r0);
    
    if( i == qs.length )
        return t;
    
    return obtenerInversoMultiplicativo([...t], qs, r0, ++i);

};

module.exports = {
    euclides,
    obtenerInversoMultiplicativo,
};