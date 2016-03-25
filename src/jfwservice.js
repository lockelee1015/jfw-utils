'use strict';
import './jquery'
const $ = window.$
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

const fetchService = function fetchService(url, param) {
    var _param = 'data='+JSON.stringify(param);
    console.log(_param)
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
export default function service (serviceId,method,param){
    if(navigator.appName == "Microsoft Internet Explorer"){
        var url = "jfwservice.do?"
            url += "serviceId=" + serviceId
            url += "&method=" + method
        return fetchService(url,param)
    }else{
        return new Promise(function (resolve, reject) {
            return JfwServer.service(serviceId, method, param, resolve, reject);
        })
    }
}