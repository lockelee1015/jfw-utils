import {notification,Button,Modal,message} from 'antd'
import React from 'react'

export default function alert(title, e) {
    if (e.status !== '-1') {
        notification.success({
            message: `${title}成功!`
        })
    } else {
        title = `${title}失败!`

        const parseExceptionTips = function (tips) {
            const result = {}
            result.detail = tips
            const excptionArr = result.detail.split('\n')
            let jfwMsgArr = excptionArr[0].split(':')[1].split('~')
            result.code = jfwMsgArr[0]
            result.message = jfwMsgArr[1]
            const causedArr = excptionArr.filter(str => str.indexOf('Caused by:') > -1)
            if (causedArr.length > 0) {
                result.cause = causedArr[0].split(':')[1]
            }
            return result
        }

        const exception = parseExceptionTips(e.tips)

        const info = ()=> {
            Modal.info({
                title: '详细信息',
                content: (
                    <div style={{height:'400px',overflow:'auto'}}>
                        {exception.detail}
                    </div>
                ),
                width: 800,
                onOk() {
                    notification.close(key)
                }
            })
        }

        const key = `open${Date.now()}`

        const btnClick = function () {
            info()
        }

        const btn = (
            <Button type="primary" size="small" onClick={btnClick}>
                查看详细
            </Button>
        )

        const alertInfo = (
            <div style={{fontSize:'12px'}}>
                <p>{'ExceptionInfo:' + exception.message}</p>
                <p>{'ExceptionType:' + exception.cause}</p>
            </div>

        )

        notification.error({
            message: title,
            description: alertInfo,
            key,
            btn,
            duration: 10
        })
    }
}