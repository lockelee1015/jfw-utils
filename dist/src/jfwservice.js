'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = service;

require('./jquery');

var $ = window.$;
var JfwServer = {
    service: function service(serviceId, method, param, callback, failCallback) {
        var url = "jfwservice.do?";
        url += "serviceId=" + serviceId;
        url += "&method=" + method;
        var _param = JSON.stringify(param);
        ajaxService(url, param, callback, failCallback);
    }
};

var ajaxService = function ajaxService(url, param, callback, failCallback) {
    var _param = JSON.stringify(param);
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: { data: _param }
    }).done(function (e) {
        return callback(e);
    }).fail(function (e) {
        console.log('数据获取失败:' + url);
        failCallback ? failCallback(e) : void 0;
    });
};

var fetchService = function fetchService(url, param) {
    var _param = 'data=' + JSON.stringify(param);
    console.log(_param);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: _param
    }).then(function (e) {
        return e.json();
    });
};

/**
 * 返回一个promise对象
 * @param serviceId
 * @param method
 * @param param
 * @returns {Promise}
 */
function service(serviceId, method, param) {
    if (navigator.appName == "Microsoft Internet Explorer") {
        var url = "jfwservice.do?";
        url += "serviceId=" + serviceId;
        url += "&method=" + method;
        return fetchService(url, param);
    } else {
        return new Promise(function (resolve, reject) {
            return JfwServer.service(serviceId, method, param, resolve, reject);
        });
    }
}