const { zhuRequest } = require("./index");
const { ORCODE_URL } = require("../app/config");

const getQRCode = (table) => {
   return zhuRequest.postArrayBuffer({
    url: `${ORCODE_URL}`,
    data: {
        path: `pages/index/index?number=${table}`
    }
   })
}

module.exports = {
    getQRCode
}