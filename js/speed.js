/**
 * 速度统计
 */

(function (win) {

    var Speed = win.Speed = function () {
        this._data = {
            minuId: -1,
            team: [],
            speed: 0.0,
            speedText: 0,
            color: 'rgb(200,200,200)',
            minuCount: 0
        };
        this._init();
    };

    Speed.prototype._init = function () {
        var that = this;
        this.$e = {
            speed: $('#speed')
        };
        this.$e.speedParent = this.$e.speed.parent();
        this._run();
    };

    Speed.prototype._insMinu = function (num) {
        var that = this;
        if (this._data.team.length > 0) {
            this._data.team.pop();
            if (num > 3) {
                setTimeout(function () {
                    that._data.team.pop();
                }, 500);
            }
            if (num > 5) {
                setTimeout(function () {
                    that._data.team.pop();
                }, 1000);
            }
        }
        this._data.minuCount++;
        this._minu();
    };
    Speed.prototype._minu = function () {
        var that = this;
        clearTimeout(this._data.minuId);
        this._data.minuId = setTimeout(function () {
            that._insMinu();
        }, 3000);
    };

    Speed.prototype.nock = function () {
        if (this._data.team.length == 0) {
            this._data.team.push(Date.now() - 1000 * 10);
        }
        this._data.team.push(Date.now());
        if (this._data.team.length > 15) {
            this._data.team.shift();
        }
        this._data.minuCount = 0;
        this._minu();
    };

    Speed.prototype._getSpeed = function () {
        var now = Date.now();
        //基于列队第一个计算
        var duration1 = (now - this._data.team[0]) / 1000;
        var average1 = duration1 / this._data.team.length;
        var speed1 = 60 / average1;
        //基于列队中间的一个计算
        var halfIndex = parseInt(this._data.team.length / 2);
        var duration2 = (now - this._data.team[halfIndex]) / 1000;
        var average2 = duration2 / halfIndex;
        var speed2 = 60 / average2;
        //平均
        this._data.speed = (speed1 + speed2) / 2 + 5;
    };

    Speed.prototype._getSpeedOut = function () {
        //显示数值
        var realNum = parseInt(this._data.speed * 1.85);
        if (this._data.speedText > realNum) {
            this._data.speedText--;
        } else if (this._data.speedText < realNum) {
            this._data.speedText++;
        }
        this._data.speedText = this._data.speedText > 100 ? 100 : this._data.speedText;
    };

    Speed.prototype._getColor = function () {
        var speed2 = this._data.speedText / 1.85;
        //范围 80 ~ 200
        var colorR = parseInt(Math.pow((-2 * speed2 + 200), 1.5) * 0.13);
        //范围 200 ~ 210
        var colorG = parseInt(1 / 6 * speed2 + 200);
        //范围 0 ~ 200
        var colorB = parseInt(Math.pow((-10 / 3 * speed2 + 200), 1.5) * 0.13);
        colorR = colorR < 80 ? 80 : colorR;
        colorG = colorG < 200 ? 200 : colorG;
        colorB = !colorB || colorB < 0 ? 0 : colorB;
        colorR = colorR > 200 ? 200 : colorR;
        colorG = colorG > 210 ? 210 : colorG;
        colorB = colorB > 200 ? 200 : colorB;
        this._data.color = 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')';
    };

    Speed.prototype._update = function () {
        if (this._data.team.length <= 3) {
            this._data.speed = 0;
        } else {
            this._getSpeed();
        }
        this._getSpeedOut();
        this._getColor();
    };

    Speed.prototype._render = function () {
        this.$e.speed
            .text(this._data.speedText)
            .css('color', this._data.color);
        if (this._data.speedText == 100) {
            this.$e.speedParent.addClass('full');
        } else {
            this.$e.speedParent.removeClass('full');
        }
    };

    Speed.prototype._run = function () {
        var that = this;
        this._timer = setInterval(function () {
            that._update();
            that._render();
        }, 100);
    };

})(window);