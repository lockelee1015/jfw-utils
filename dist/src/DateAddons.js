"use strict";

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "D+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "S+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "s": this.getMilliseconds() //毫秒
    };
    if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }return fmt;
};

/**
 * 字符串转日期,参数里面填,默认是YYYY-MM-DD
 * @param pattern
 * @returns {Date}
 */
String.prototype.toDate = function () {
    var pattern = arguments.length <= 0 || arguments[0] === undefined ? 'YYYY-MM-DD' : arguments[0];

    var date = new Date();
    if (pattern.indexOf("YYYY") > -1) {
        var yearIndex = pattern.indexOf("YYYY");
        date.setFullYear(this.substring(yearIndex, yearIndex + 4));
    }
    if (pattern.indexOf("MM") > -1) {
        var monthIndex = pattern.indexOf("MM");
        date.setMonth(this.substring(monthIndex, monthIndex + 2) - 1);
    }
    if (pattern.indexOf("DD") > -1) {
        var dayIndex = pattern.indexOf("DD");
        date.setDate(this.substring(dayIndex, dayIndex + 2));
    }
    if (pattern.indexOf("HH") > -1) {
        var hourIndex = pattern.indexOf("HH");
        console.log('hehe');
        date.setHours(this.substring(hourIndex, hourIndex + 2));
    }
    if (pattern.indexOf("mm") > -1) {
        var minutesIndex = pattern.indexOf("mm");
        date.setMinutes(this.substring(minutesIndex, minutesIndex + 2));
    }
    if (pattern.indexOf("SS") > -1) {
        var secondsIndex = pattern.indexOf("SS");
        date.setSeconds(this.substring(secondsIndex, secondsIndex + 2));
    }
    return date;
};