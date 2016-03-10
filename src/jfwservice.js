'use strict';
import $ from "jquery";

const JfwServer = {
    service: function (serviceId, method, param, callback, failCallback) {
        let url = "jfwservice.do?";
        url += "serviceId=" + serviceId;
        url += "&method=" + method;
        let _param = JSON.stringify(param);
        ajaxService(url, param, callback, failCallback);
    }
}

const ajaxService = function (url, param, callback, failCallback) {
    let _param = JSON.stringify(param);
    $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: {data: _param},
        })
        .done((e)=>callback(e))
        .fail(function (e) {
            console.log(`数据获取失败:${url}`);
            failCallback ? failCallback(e) : void(0);
        })
}

/**
 * 返回一个promise对象
 * @param serviceId
 * @param method
 * @param param
 * @returns {Promise}
 */
export function service (serviceId,method,param){
    return new Promise((resolve,reject)=>JfwServer.service(serviceId,method,param,resolve,reject))
}

export default JfwService