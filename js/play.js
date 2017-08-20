/**
 * 字母练习
 */

$(function() {

    var $uppercase = $('.uppercase'),
        $lowercase = $('.lowercase'),
        $audioCtrl = $('#audioCtrl'),
        $result = $('#result');

    //播放音乐
    var audio = null;
    var audioPlay = function(type) {
        if(!audio) {
            audio = new Audio();
        }
        audio.src = 'sound/' + type + '.mp3';
        audio.play();
    };

    //选取随机字母
    var getLetter = function() {
        var code = parseInt(Math.random() * 26) + 97;
        return String.fromCharCode(code);
    };

    //播放字母
    var playLetter = function() {
        $uppercase.text(curLetter.toUpperCase());
        $lowercase.text(curLetter);
        audioPlay(curLetter);
    }

    //当前字母
    var curLetter = getLetter();

    //初始化
    playLetter();

    var keyList = {
        c70: 'f'
    }

    //事件绑定
    $(document).on('keydown', function(e) {
        var code = e.originalEvent.keyCode;
        if(code < 65 || code > 90) {
            if(code == 13) {
                audioPlay(curLetter);
            }
            return;
        }
        var keyLetter = String.fromCharCode(code - 65 + 97);
        if(keyLetter == curLetter) {
            audioPlay('success');
            $result.addClass('success');
            setTimeout(function() {
                $result.removeClass('success');
            }, 300);
            setTimeout(function() {
                curLetter = getLetter();
                playLetter();
            }, 500);
        } else {
            audioPlay('error');
            $result.addClass('error');
            setTimeout(function() {
                $result.removeClass('error');
            }, 300);
        }
    });
    $audioCtrl.on('click', function() {
        audioPlay(curLetter);
    });

});