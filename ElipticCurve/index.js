const elipticMachine = require('./utils/ElipticMachine');
const { Point } = require('./utils/Point');
const { ElipticCurve } = require('./utils/ElipticMachine');

const a = 36;
const b = 0;
const p = 353;
const xo = new Point(231, 217);
const newPoint = ElipticCurve.addSamePoints(xo, a, p );
const thirdPoint = ElipticCurve.addDifferentPoints(xo, newPoint, a, p );

console.log(newPoint, thirdPoint);