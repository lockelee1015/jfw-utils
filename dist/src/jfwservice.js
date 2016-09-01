'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = service;

require('./jquery');

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        handleException(e);
        callback(e);
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
        return handleException(e.json());
    });
};

var handleException = function handleException(e) {
    if (window._jfwExceptionHandler && e.status === '-1') {
        window._jfwExceptionHandler(e);
    }
    return e;
};

/**
 * 返回结果为{code:'JFW0000',message:'异常信息',cause:'原因',detail:'具体异常信息'}
 */
var parseExceptionTips = function parseExceptionTips(e) {
    var result = {};
    result.detail = e.tips;
    var excptionArr = result.detail.split('\n');
    var jfwMsgArr = excptionArr[0].split(':')[1].split('~');
    result.code = jfwMsgArr[0];
    result.message = jfwMsgArr[1];
    var causedArr = excptionArr.filter(function (str) {
        return str.indexOf('Caused by:') > -1;
    });
    if (causedArr.length > 0) {
        result.cause = causedArr[0].split(':')[1];
    }
    return result;
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
        return new _promise2.default(function (resolve, reject) {
            return JfwServer.service(serviceId, method, param, resolve, reject);
        });
    }
}