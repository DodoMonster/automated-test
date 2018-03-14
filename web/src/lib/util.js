import {
    EventEmitter
} from 'events';
const Util = new EventEmitter();

/**
 * 1.普通提示：Util.dialog.alert({msg:['请先选择系统名称！']}); - 只显示确定按钮
 * 2.带询问：Util.dialog.show({msg:['请先选择系统名称！'],callback:function(){}); 
 *   显示确定和取消按钮,callback->确定按钮绑定的函数
 * 公共@param {
 *          title:提示框标题(有默认值-系统信息，可不传),
 *          msg:提示语,必须传数组 (1.普通字符串;2.多语言：this.$t("member_name_input_tips"))
 *          cancleBtnText:取消按钮文案(有默认值-取消，可不传),
 *          confirmBtnText:确定按钮文案(有默认值-确定，可不传) 
 *     }
 */
Util.dialog = {
    show(data) {
        Util.removeAllListeners('confirm-dialog').removeAllListeners(
            'cancel-dialog');
        Util.emit('show-dialog', data);
        if (data.callback) {
            this.confirm(data.callback);
        }
        if (data.cancelCallback) {
            this.cancel(data.cancelCallback);
        }
        return this;
    },
    hide() {
        Util.emit('hide-dialog');
    },
    confirm(fn) {
        Util.removeAllListeners('confirm-dialog');
        Util.on('confirm-dialog', fn);
    },
    cancel(fn) {
        Util.on('cancel-dialog', fn);
        return this;
    }
}

Util.isBlank = function (obj) {
    return !obj || !/\S/.test(obj) || obj === "undefined" || obj === "null";
}

Util.delCookie = function (name) {
    this.addCookie(name, "", 1 / 3600);
}

Util.clearCookie = function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].indexOf('__') != 0) {
                this.delCookie(keys[i]);
            }
        }
    }
}

Util.getCookie = function (objName) {
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var current = arrStr[i].replace("=", "$=");
        var temp = current.split("$=");
        try {
            if (temp[0] == objName) return decodeURIComponent(temp[1]);
        } catch (e) {
            if (temp[0] == objName) return unescape(temp[1]);
        }
    }
    return '';
}

Util.addCookie = function (objName, objValue, objHours) {
    var str = objName + "=" + encodeURIComponent(objValue);
    if (objHours > 0) { //为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toUTCString();
    }
    // if (Util.isBlank(location.port)) {
    //     str += "; domain=." + window.__INITIAL_STATE__.Config.DOMAIN;
    // }
    str += "; path=/";
    document.cookie = str;
}

Util.setStorage = function (key, json) {
    try {
        if (!this.isBlank(this.getStorage(key))) { //ios 存在的 直接覆蓋不了的問題
            this.removeStorage(key);
        }
        window.localStorage.setItem(key, JSON.stringify(json));
    } catch (e) {
        this.addCookie(key, JSON.stringify(json));
    }
}

Util.removeStorage = function (key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        this.delCookie(key);
    }
}

Util.clearStorage = function (key) {
    if (key) {
        localStorage.removeItem(key);
    } else {
        window.localStorage.clear();
    }
}

Util.getStorage = function (key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || JSON.parse(this.getCookie(key));
    } catch (e) {
        if (!Util.isBlank(this.getCookie(key))) {
            return JSON.parse(Util.getCookie(key));
        } else {
            return null;
        }
    }
}

Util.getFormData = function (params) {
    var formData = new FormData();
    for (var i in params) {
        formData.append(i, params[i])
    }
    return formData;
}

Util.logOut = function (path) {
    this.clearCookie();
    this.clearStorage();
    window.location.href = path ? path : '/home';
}
/*
return :
0: 登录过期或未登录，需要跳回登录页面进行登录
1: 登录过期或未登录，但不需要强制登录
2：已登录
*/
Util.checkIfLogin = function (noNeedLogin, path) {
    var username = this.getCookie("username"),
        accessToken = this.getCookie('accessToken');
    if (this.isBlank(username) || this.isBlank(accessToken)) {
        if (!noNeedLogin) { // 不需要强制跳转
            if (path) {
                window.location.href = '/login?from=' + encodeURIComponent(path);
            } else {
                window.location.href = '/login?from=' + encodeURIComponent(window.location.href);
            }
        } else {
            return false;
        }
    } else {
        return true;
    }
}

Util.isEmptyObject = function (e) {
    var t;
    for (t in e) {
        return !1;
    }
    return !0
}

export default Util;