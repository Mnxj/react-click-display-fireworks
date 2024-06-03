'use strict';

var anime = require('animejs');

var debounce = function (fn, delay) {
    var timer;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        timer && clearTimeout(timer);
        if (!timer) {
            fn.apply(this, args);
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, delay);
    };
};
var colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
var _createParticule = Symbol('createParticule');
var MouseClickAnimation = /** @class */ (function () {
    function MouseClickAnimation(canvasEl) {
        var _this = this;
        this.pointerX = 0;
        this.pointerY = 0;
        this.left = 0;
        this.top = 0;
        this.updateCoords = function (e) {
            _this.pointerX = (e.clientX || e.touches[0].clientX) - _this.left;
            _this.pointerY = e.clientY || e.touches[0].clientY - _this.top;
        };
        this.animateParticules = function () {
            var n = [];
            for (var i = 0; i < 30; i++) {
                n.push(_this[_createParticule]());
            }
            anime.timeline().add({
                targets: n,
                x: function (e) { return e.endPos.x; },
                y: function (e) { return e.endPos.y; },
                radius: 0.1,
                duration: anime.random(1200, 1800),
                easing: "easeOutExpo",
                update: renderParticule
            });
        };
        var ctx = canvasEl.getContext('2d');
        this.setCanvasSize = debounce(function () {
            canvasEl.width = 2 * window.innerWidth;
            canvasEl.height = 2 * window.innerHeight;
            canvasEl.style.width = window.innerWidth + 'px';
            canvasEl.style.height = window.innerHeight + 'px';
            ctx.scale(2, 2);
        }, 500);
        anime({ duration: 1 / 0, update: function () { return ctx.clearRect(0, 0, canvasEl.width, canvasEl.height); } });
        var _a = canvasEl.getBoundingClientRect(), left = _a.left, top = _a.top;
        this.top = top;
        this.left = left;
        this.ctx = ctx;
    }
    MouseClickAnimation.prototype[_createParticule] = function () {
        var a = {};
        var ctx = this.ctx;
        return a.x = this.pointerX,
            a.y = this.pointerY,
            a.color = colors[anime.random(0, colors.length - 1)],
            a.radius = anime.random(16, 32),
            a.endPos = setParticuleDirection(a),
            a.draw = function () {
                ctx.beginPath();
                ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0);
                ctx.fillStyle = a.color;
                ctx.fill();
            },
            a;
    };
    return MouseClickAnimation;
}());
var setParticuleDirection = function (e) {
    var t = anime.random(0, 360) * Math.PI / 180, a = anime.random(50, 180), n = [-1, 1][anime.random(0, 1)] * a;
    return {
        x: e.x + n * Math.cos(t),
        y: e.y + n * Math.sin(t)
    };
};
var renderParticule = function (e) {
    for (var t = 0; t < e.animatables.length; t++) {
        e.animatables[t].target.draw();
    }
};

module.exports = MouseClickAnimation;
