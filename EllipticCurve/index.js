const { Point } = require('./utils/Point');
const { EllipticCurve } = require('./utils/EllipticMachine');
const { dec2bin } = require('../Exponentiation/expontiation/utils/functions');
const { SquareMultiply } = require('../Exponentiation/expontiation/utils/functions');
const { mod } = require('../Miller-Rabin/utils/functions');

const getGeneratorCurve = (a,b,p,q,originalPoint) => {
    // k = (x0^3 - y0^2) (x0)^-1 mod p
    const inverseXOriginalPoint = EllipticCurve.getInverseNumber(originalPoint.getX, p);
    const diffXY = mod(SquareMultiply(originalPoint.getX, 3, p) - SquareMultiply(originalPoint.getY, 2, p), p);
    const k = mod(inverseXOriginalPoint * diffXY, p);
    
    console.log('k', k);
    console.log('p', p);
    console.log('q', q);
    
    // Binary conversion
    const qBin = dec2bin(q-1);
    
    console.log('Binaryq', qBin.length, qBin);
    const goingPositions = qBin.length-1;
    const activePositions = qBin.split('').filter(item => item === '1').length;
    
    console.log('goingPositions', goingPositions, 'activePosition', activePositions);
    
    // SumPoints ^ 2
    const points = [originalPoint];
    for(let i = 0; i < goingPositions; i++) {
        points.push(EllipticCurve.addSamePoints(points[i], k, p));
    }
    
    let sumActivesBits = 0;
    const qBinR = qBin.split('').reverse();
    for(let i = 0; i < points.length; i++) {
        if (qBinR[i] === '1') 
            sumActivesBits += Math.pow(2, i);
        console.log(`${Math.pow(2, i)}a -`, points[i])
    }
    
    console.log('sumActiveBits', sumActivesBits);
    
    const sumPoints = [];
    for(let i = goingPositions; i > 0; i--) {
        if (qBinR[i] === '1') {
            if (!sumPoints.length) {
                sumPoints.push(points[i]);
                continue;
            }
            const currentPoint = sumPoints[sumPoints.length - 1];
            console.log(`Adding points`)
            const newPoint = EllipticCurve.addDifferentPoints(currentPoint, points[i]);
            sumPoints.push(newPoint);
        }
    }
    
    console.log('sumPoints',sumPoints);

};

// Example curve
// y^2 = x^3 - kx mod p
// y^2 = x^3 - ax + b mod p
// y^2 = x^3 - 36x mod p

const a = 651; // odd
const b = 170; // even

// p = a^2 + b^2
const p = Math.pow(a, 2) + Math.pow(b, 2);

// q = (p + 1 + 2a)/4
const q = (p + 1 + 2*a)/4;

const originalPoint = new Point(55211, 443096);

//getGeneratorCurve(a,b,p,q,originalPoint);
const point = new Point(39631, 72741);
console.log(point, !EllipticCurve.isSolveForCurve(point, 68445, 94349, true) ? 'no' : '', ' es solución de la curva');
//EllipticCurve.addSamePoints(xo, a, p );
//const point = EllipticCurve.addSamePoints(xo, a, p );