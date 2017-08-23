/**
 * 速度统计
 */

(function (win) {

    var Speed = win.Speed = function () {
        this._data = {
            minuId: -1,
            team: [],
            speed: 0,
            color: 'rgb(200,200,200)'
        };
        this._init();
    };

    Speed.prototype._init = function () {
        var that = this;
        this.$e = {
            speed: $('#speed')
        };
        this._run();
    };

    Speed.prototype._preMinu = function () {
        this._data.team.pop();
        this._minu();
    };
    Speed.prototype._minu = function () {
        var that = this;
        clearTimeout(this._data.minuId);
        this._data.minuId = setTimeout(function () {
            that._preMinu();
        }, 3000);
    };

    Speed.prototype.nock = function () {
        if (this._data.team.length == 0) {
            this._data.team.push(Date.now() - 1000 * 6);
        }
        this._data.team.push(Date.now());
        if (this._data.team.length > 20) {
            this._data.team.shift();
        }
        this._minu();
    };

    Speed.prototype._update = function () {
        if (this._data.team.length <= 3) {
            this._data.speed = 0;
        } else {
            var duration = (Date.now() - this._data.team[0]) / 1000;
            var average = duration / this._data.team.length;
            this._data.speed = parseInt(60 / average);
        }
        var speed2 = this._data.speed > 60 ? 60 : this._data.speed;
        var colorR = parseInt(Math.pow((-2 * speed2 + 200), 1.5) * 0.13);
        var colorG = parseInt(1 / 6 * speed2 + 200);
        var colorB = parseInt(Math.pow((-10 / 3 * speed2 + 200), 1.5) * 0.13);
        colorR = colorR < 0 ? 0 : colorR;
        colorG = colorG < 0 ? 0 : colorG;
        colorB = colorB < 0 ? 0 : colorB;
        colorR = colorR > 200 ? 200 :colorR;
        colorG = colorG > 200 ? 200 :colorG;
        colorB = colorB > 200 ? 200 :colorB;
        this._data.color = 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')';
    };

    Speed.prototype._render = function () {
        this.$e.speed
            .text(this._data.speed)
            .css('color', this._data.color);
    };

    Speed.prototype._run = function () {
        var that = this;
        this._timer = setInterval(function () {
            that._update();
            that._render();
        }, 1000);
    };

})(window);