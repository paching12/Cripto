const { euclides, obtenerInversoMultiplicativo } = require('./Euclides/utils/functions');
const { T } = require('./Euclides/constants');

const divisor = 2406;
const dividendo = 8663;
    
const qs = euclides( divisor, dividendo );
if(qs[qs.length - 1 ] == 1){
    console.log( 'Euclides qs: ', qs);
}

// Tiene inverso multiplicativo.
if (Array.isArray(qs) && qs[qs.length-1] == 1) {
    qs.pop();
    const t = obtenerInversoMultiplicativo( [...T], [1, ...qs], dividendo );
    console.log('Inverso Multiplicativo T: ', t);
}