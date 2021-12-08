class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    get getX() {
        return this.x;
    }

    get getY() {
        return this.y;
    }

    set setx(x) {
        this.x = x; 
    }

    set setY(y) {
        this.y = y; 
    }

    showPoints() {
        return {
            x: this.x,
            y: this.y,
        };
    }

    static addPoint(point) {
        if (!(point instanceof Point)) return false;

    }
}

module.exports = {
    Point,
};