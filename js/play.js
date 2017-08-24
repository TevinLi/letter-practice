/**
 * 字母练习
 */

$(function() {

    var $uppercase = $('.uppercase'),
        $lowercase = $('.lowercase'),
        $audioCtrl = $('#audioCtrl'),
        $result = $('#result'),
        $mod = $('#mod'),
        $letter = $('#letter');
        
    //听力模式
    if (sessionStorage['letter-practice-mod'] == 'listen') {
        $letter.addClass('off');
        $mod.prop('checked', true);
    }
    $mod.on('change', function() {
        if ($(this).is(':checked')) {
            sessionStorage['letter-practice-mod'] = 'listen';
            $letter.addClass('off');
        } else {
            sessionStorage['letter-practice-mod'] = 'normal';
            $letter.removeClass('off');
        }
    });

    //播放音乐
    var audio = null;
    var audioPlay = function(type) {
        if(!audio) {
            audio = new Audio();
        }
        audio.src = 'sound/' + type + '.mp3';
        audio.play();
    };

    //速度显示
    var speed = new Speed();

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
    };

    //初始化
    var curLetter = getLetter();
    playLetter();

    //事件绑定
    var working = false;
    $(document).on('keydown', function(e) {
        //按键范围检查
        var code = e.originalEvent.keyCode;
        if(code < 65 || code > 90) {
            if(code == 13) {
                audioPlay(curLetter);
            }
            return;
        }
        //播放状态检查
        if (working) {
            return;
        } else {
            working = true;
        }
        //执行操作
        var keyLetter = String.fromCharCode(code - 65 + 97);
        if(keyLetter == curLetter) {
            audioPlay('success');
            $result.addClass('success');
            speed.nock();
            setTimeout(function() {
                $result.removeClass('success');
            }, 300);
            setTimeout(function() {
                curLetter = getLetter();
                playLetter();
            }, 400);
        } else {
            audioPlay('error');
            $result.addClass('error');
            setTimeout(function() {
                $result.removeClass('error');
            }, 300);
        }
        setTimeout(function(){
            working = false;
        }, 400);
    });
    $audioCtrl.on('click', function() {
        audioPlay(curLetter);
    });

});