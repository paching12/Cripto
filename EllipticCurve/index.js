const { Point } = require('./utils/Point');
const { EllipticCurve } = require('./utils/EllipticMachine');
const { dec2bin } = require('../Exponentiation/expontiation/utils/functions');
const { SquareMultiply } = require('../Exponentiation/expontiation/utils/functions');
const { mod } = require('../Miller-Rabin/utils/functions');

const getDoblePoints = (q, k, point, p, debugg) => {
    // Binary conversion
    const qBin = dec2bin(q);
    
    if (debugg) console.log('Binaryq', qBin.length, qBin);
    const goingPositions = qBin.length-1;
    const activePositions = qBin.split('').filter(item => item === '1').length;
    
    if (debugg) console.log('goingPositions', goingPositions, 'activePosition', activePositions);
    
    // SumPoints ^ 2
    const points = [originalPoint];
    for(let i = 0; i < goingPositions; i++) {
        const point = EllipticCurve.addSamePoints(points[i], k, p);
        const isInCurve = EllipticCurve.isSolveForCurve(point, k, p);
        if (!isInCurve) {
            console.error(point, 'Is not a solve for the curve');
            break;
        }
        points.push(point);
    }
    return points;
};

const getAddingPointsOnActiveState = (goingPositions, points,k,a,p, binary, debugg) => {
    const sumPoints = [];
    for(let i = goingPositions; i >= 0; i--) {
        if (binary[i] === '1') {
            if (!sumPoints.length) {
                sumPoints.push(points[i]);
                continue;
            }
            const currentPoint = sumPoints[sumPoints.length - 1];
            const newPoint = EllipticCurve.addDifferentPoints(currentPoint, points[i], a, p);
            const isInCurve = EllipticCurve.isSolveForCurve(newPoint, k, p);
            if (!isInCurve) {
                console.error(newPoint, 'Is not a solve for the curve');
                break;
            }
            sumPoints.push(newPoint);
        }
    }

    if (debugg) console.log(sumPoints);
    return sumPoints;
};

const getNPointByStringBits = (a,b,p,q,k,originalPoint, debugg = false) => {
    console.log('k', k);
    console.log('p', p);
    console.log('q', q);
    
    const points = getDoblePoints(q, k, originalPoint, p);
    const qBin = dec2bin(q);
    const goingPositions = qBin.length - 1;
    console.log('binary', qBin, points);
    
    // Just to debugg
    let sumActivesBits = 0;
    const qBinR = qBin.split('').reverse();
    for(let i = 0; i < points.length; i++) {
        if (qBinR[i] === '1') 
            sumActivesBits += Math.pow(2, i);
        if (debugg) console.log(`${Math.pow(2, i)}a -`, points[i])
    }
    
    if (debugg) {
        console.log('points', points);
        console.log('sumActiveBits', sumActivesBits);
    }
    
    const sumPoints = getAddingPointsOnActiveState(goingPositions, points,k,a,p, qBinR);

    return sumPoints;
};

const getK = (originalPoint, p) => {
    const inverseXOriginalPoint = EllipticCurve.getInverseNumber(originalPoint.getX, p);
    const diffXY = mod(SquareMultiply(originalPoint.getX, 3, p) - SquareMultiply(originalPoint.getY, 2, p), p);
    const k = mod(inverseXOriginalPoint * diffXY, p);
    console.log('k', k);
    return k;
};

// Example curve
// y^2 = x^3 - kx mod p
// y^2 = x^3 - ax + b mod p
// y^2 = x^3 - 36x mod p

const originalPoint = new Point(37202, 152234);
// const originalPoint = new Point(231, 217);

const a = 651; // odd
const b = 170; // even

// p = a^2 + b^2
const p = Math.pow(a, 2) + Math.pow(b, 2);
console.log('p', p);

// q = (p + 1 + 2a)/4
const q = (p + 1 + (2*a))/4;

// k = (x0^3 - y0^2) (x0)^-1 mod p
let k = getK(originalPoint, p);
// Example  const originalPoint = new Point(231, 217);
// const points = getNPointByStringBits(a,b,p,q-1,-k,originalPoint, true);
// console.log(points);

// Excercise 3
// const sumPoints = getNPointByStringBits(a,b,p,q-1,-k,originalPoint, true);
// console.log(sumPoints);
// console.log(originalPoint, EllipticCurve.isThisPointAGenerator(originalPoint, sumPoints, p, true) ? '' : 'no', ' es un elemento generador');

// Excercise 4 a)
const B = 921;
const points = getNPointByStringBits(a,b,p,B,-k,originalPoint, true);
console.log(points);

// Excercise 4 b)
// const point1 = new Point(104153,359847);
// k = getK(point1, p);
// const point2 = new Point(91492,126124);
// console.log( EllipticCurve.addDifferentPoints(point1, point2, a, p, true) );
// x: 252851, y: 350278

