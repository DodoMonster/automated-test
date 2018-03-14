function showCheck(a) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.font = "80px 'Microsoft Yahei'";
    ctx.fillText(a, 0, 100);
    ctx.fillStyle = "white";
    ctx.strokeStyle = 'white';
}
var code;

function createCode() {
    code = "";
    var codeLength = 4;
    var selectChar = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 60);
        code += selectChar[charIndex];
    }
    if (code.length != codeLength) {
        createCode();
    }
    showCheck(code);
}

function validate() {
    var inputCode = document.getElementById("J_codetext").value.toUpperCase();
    var codeToUp = code.toUpperCase();
    if (inputCode.length <= 0) {
        document.getElementById("J_codetext").setAttribute("placeholder", "输入验证码");
        createCode();
        return false;
    } else if (inputCode != codeToUp) {
        document.getElementById("J_codetext").value = "";
        document.getElementById("J_codetext").setAttribute("placeholder", "验证码错误");
        createCode();
        return false;
    } else {
        // window.open(document.getElementById("J_down").getAttribute("data-link"));
        // document.getElementById("J_codetext").value = "";
        // createCode();
        return true;
    }
}

function addCookie(objName, objValue, objHours) {
    var str = objName + "=" + encodeURIComponent(objValue);
    if (objHours > 0) { //为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toUTCString();
    }
    str += "; path=/";
    document.cookie = str;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

$(document).ready(function () {
    //粒子背景特效
    $('body').particleground({
        dotColor: '#5cbdaa',
        lineColor: '#5cbdaa'
    });
    //验证码
    createCode();
    //测试提交，对接程序删除即可
    $("#btn_submit").click(function () {
        var username = $('#username').val(),
            password = $('#password').val();
        if (!username || !password) {
            alert('参数不能为空');
            return;
        } else if (!validate()) {
            alert('验证码错误');
            return;
        }
        $.post('/api/user/login', {
            username: username,
            password: password
        }).then(function (res) {
            if (res.code === 0) {
                var from = getQueryString('from') || '/';
                addCookie('username', res.data.username);
                addCookie('accessToken', res.data.accessToken);
                location.href = from;
            } else {
                alert(res.message);
            }
        })
    });
});