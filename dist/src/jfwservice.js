'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = service;

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    _jquery2.default.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: { data: _param }
    }).done(function (e) {
        return callback(e);
    }).fail(function (e) {
        console.log("数据获取失败:" + url);
        failCallback ? failCallback(e) : void 0;
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
    return new Promise(function (resolve, reject) {
        return JfwServer.service(serviceId, method, param, resolve, reject);
    });
}