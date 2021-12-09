const { Point } = require('./utils/Point');
const { EllipticCurve } = require('./utils/EllipticMachine');
const { dec2bin } = require('../Exponentiation/expontiation/utils/functions');
const { SquareMultiply } = require('../Exponentiation/expontiation/utils/functions');
const { mod } = require('../Miller-Rabin/utils/functions');

const getGeneratorCurve = (a,b,p,q,originalPoint, debugg = false) => {
    // k = (x0^3 - y0^2) (x0)^-1 mod p
    const inverseXOriginalPoint = EllipticCurve.getInverseNumber(originalPoint.getX, p);
    const diffXY = mod(SquareMultiply(originalPoint.getX, 3, p) - SquareMultiply(originalPoint.getY, 2, p), p);
    const k = mod(inverseXOriginalPoint * diffXY, p);
    
    console.log('k', k);
    console.log('p', p);
    console.log('q', q);
    
    // Binary conversion
    const qBin = dec2bin(q-1);
    
    if (debugg) console.log('Binaryq', qBin.length, qBin);
    const goingPositions = qBin.length-1;
    const activePositions = qBin.split('').filter(item => item === '1').length;
    
    if (debugg) console.log('goingPositions', goingPositions, 'activePosition', activePositions);
    
    // SumPoints ^ 2
    const points = [originalPoint];
    for(let i = 0; i < goingPositions; i++) {
        const point = EllipticCurve.addSamePoints(points[i], k, p);
        const isInCurve = EllipticCurve.isSolveForCurve(point, k, p, false);
        if (!isInCurve) {
            console.error(newPoint, 'Is not a solve for the curve');
            break;
        }
        points.push(point);
    }
    
    let sumActivesBits = 0;
    const qBinR = qBin.split('').reverse();
    for(let i = 0; i < points.length; i++) {
        if (qBinR[i] === '1') 
            sumActivesBits += Math.pow(2, i);
        if (debugg) console.log(`${Math.pow(2, i)}a -`, points[i])
    }
    
    if (debugg) console.log('sumActiveBits', sumActivesBits);
    
    const sumPoints = [];
    for(let i = goingPositions; i > 0; i--) {
        if (qBinR[i] === '1') {
            if (!sumPoints.length) {
                sumPoints.push(points[i]);
                continue;
            }
            const currentPoint = sumPoints[sumPoints.length - 1];
            const newPoint = EllipticCurve.addDifferentPoints(currentPoint, points[i], a, p);
            const isInCurve = EllipticCurve.isSolveForCurve(newPoint, k, p, false);
            if (!isInCurve) {
                console.error(newPoint, 'Is not a solve for the curve');
                break;
            }
            sumPoints.push(newPoint);
        }
    }

    if (debugg) console.log(sumPoints);
    
    const generator = sumPoints[sumPoints.length - 1];
    const yNegative = mod(-originalPoint.getY, p);
    if (debugg) console.log(`${yNegative} === ${generator.getY}`)
    return yNegative === generator.getY;

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

const isGenerator = getGeneratorCurve(a,b,p,q,originalPoint, true);
console.log(originalPoint, isGenerator ? '' : 'no', ' es un elemento generador')
// const point = new Point(39631, 72741);
// console.log(point, !EllipticCurve.isSolveForCurve(point, 68445, 94349, true) ? 'no' : '', ' es solución de la curva');
//EllipticCurve.addSamePoints(xo, a, p );
//const point = EllipticCurve.addSamePoints(xo, a, p );