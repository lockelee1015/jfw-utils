'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = alert;

var _antd = require('antd');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function alert(title, e) {
    if (e.status !== '-1') {
        _antd.notification.success({
            message: title + '成功!'
        });
    } else {
        (function () {
            title = title + '失败!';

            var parseExceptionTips = function parseExceptionTips(tips) {
                var result = {};
                result.detail = tips;
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

            var exception = parseExceptionTips(e.tips);

            var info = function info() {
                _antd.Modal.info({
                    title: '详细信息',
                    content: _react2.default.createElement(
                        'div',
                        { style: { height: '400px', overflow: 'auto' } },
                        exception.detail
                    ),
                    width: 800,
                    onOk: function onOk() {
                        _antd.notification.close(key);
                    }
                });
            };

            var key = 'open' + Date.now();

            var btnClick = function btnClick() {
                info();
            };

            var btn = _react2.default.createElement(
                _antd.Button,
                { type: 'primary', size: 'small', onClick: btnClick },
                '查看详细'
            );

            var alertInfo = _react2.default.createElement(
                'div',
                { style: { fontSize: '12px' } },
                _react2.default.createElement(
                    'p',
                    null,
                    'ExceptionInfo:' + exception.message
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'ExceptionType:' + exception.cause
                )
            );

            _antd.notification.error({
                message: title,
                description: alertInfo,
                key: key,
                btn: btn,
                duration: 10
            });
        })();
    }
}