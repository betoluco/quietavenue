export default function Transform(a, d, e, f) {
    this.a = a;
    this.d = d;
    this.e = e;
    this.f = f;
}

Transform.prototype = {
    constructor: Transform,   
    invertX: function(x) {
        return (x - this.e) / this.a;
    },
    invertY: function(y) {
        return (y - this.f) / this.d;
    },
    rescaleX: function(x) {
        return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    },
    rescaleY: function(y) {
        return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    }
};