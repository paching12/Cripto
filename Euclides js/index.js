const { euclides, obtenerInversoMultiplicativo } = require('./Euclides/utils/functions');
const { T } = require('./Euclides/constants');

const divisor = 886192;
const dividendo = 452701;

const qs = euclides( divisor, dividendo );
console.log( 'Euclides qs: ', qs);
if(qs[qs.length - 1 ] == 1) {
}

// Tiene inverso multiplicativo.
if (Array.isArray(qs) && qs[qs.length-1] == 1) {
    qs.pop();
    const t = obtenerInversoMultiplicativo( [...T], [1, ...qs], dividendo );
    console.log('Inverso Multiplicativo T: ', t);
}