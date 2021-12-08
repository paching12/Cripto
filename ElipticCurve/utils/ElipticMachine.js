const { Point } = require('./Point');
const { euclides, obtenerInversoMultiplicativo } = require('../../Euclides js/Euclides/utils/functions');
const { T } = require('../../Euclides js/Euclides/constants');
const { SquareMultiply } = require('./../../Exponentiation/expontiation/utils/functions');
const { mod } = require('./../../Miller-Rabin/utils/functions');

class ElipticCurve {
    constructor(y = null,x = null,a = null,b = null,p = null) {
      this.x = x;
      this.y = y;
    }

    static addSamePoints(point1, alpha = 36, p = 353) {
        if (
            !(point1 instanceof Point)
        ) throw new Error('At least one point is not an Point instance.');

        const getLambda = (point, a, p) => {
            const inverse = this.getInverseNumber(2*point.getY, p);
            if (!inverse) throw new Error(`${inverse} has not inverse`);
            const power = SquareMultiply(point.getX, 2, p);
            
            //console.log(`(3*(${power}) - ${a}) (${(inverse)})`);
            return mod((3*power - a)*(inverse), p);
        }
    
        this.lambda = getLambda(point1, alpha, p);

        const getX = (lambdaVal, x1, p) => mod(SquareMultiply(lambdaVal, 2, p) - 2*x1, p);
        const x3 = getX(this.lambda, point1.getX, p);
        const newPoint = new Point(x3, null);

        //console.log(`lambda ${this.lambda}`);
        //console.log(`x3 ${x3}`);
        
        const y3 = this.getY(this.lambda, point1, newPoint, p);
        newPoint.setY = y3;

        return newPoint;
    }

    static addDifferentPoints(point1, point2, alpha = 36, p = 353) {
        if (
            !(point1 instanceof Point) ||
            !(point2 instanceof Point)
        ) throw new Error('At least one point is not an Point instance.');

        const getLambda = (point1, point2, p) => {
            const xDiff = (point2.getX - point1.getX);
            const inverseDiffX = this.getInverseNumber(xDiff, p); 
            const yDiff = (point2.getY - point1.getY); 
            return mod(yDiff * inverseDiffX, p);
        };

        const getX = (point1, point2, lambda, p) => {
            const lambdaPow2 = SquareMultiply(lambda, 2, p);
            const xSum = point1.getX + point2.getX;
            return mod(lambdaPow2 - xSum, p);
        };
    
        this.lambda = getLambda(point1, point2, p);
        const x3 = getX(point1, point2, this.lambda, p);
        const newPoint = new Point(x3, this.getY(this.lambda, point1, new Point(x3, null), p));
        return newPoint;
    }

    static getY(lambda, point1, point2, p) {
        if (
            !(point1 instanceof Point) ||
            !(point2 instanceof Point)
        ) throw new Error('At least one point is not an Point instance on calculating y3');
        //console.log(`${lambda} * (${point1.getX} - ${point2.getX})`)
        return mod(lambda*(point1.getX - point2.getX) - point1.getY, p);
    }

    static getInverseNumber(number, module = 1, debugg = false) {
        const qs = euclides(number, module);
        
        if(qs[qs.length - 1 ] == 1) {
            if(debugg) console.log( 'Euclides qs: ', qs);
        }

        if (Array.isArray(qs) && qs[qs.length-1] == 1) {
            qs.pop();
            const t = obtenerInversoMultiplicativo( [...T], [1, ...qs], module );
            if(debugg) console.log('Inverso Multiplicativo T: ', t);
            return t[t.length-1];
        }

        return false;
    };
}


module.exports = {
    ElipticCurve
}