const { zhuRequest } = require("./index");
const { SEND_MESSAGE_URL , TEMPLATE_ID , MINIPROGRAM_STATE } = require("../app/config");
//微信小程序消息订阅

const sendMessage = (touser,data) => {
    return zhuRequest.post({
        url: SEND_MESSAGE_URL,
        data: {
            //所需下发的订阅模板id
            template_id: TEMPLATE_ID,
            //接受用户的openid
            touser,
            //data模板内容
            data,
            //小程序类型
            miniprogram_state: MINIPROGRAM_STATE
        }
    })
}

module.exports = {
    sendMessage
}