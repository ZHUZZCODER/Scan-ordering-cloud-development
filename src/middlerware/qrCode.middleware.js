const { queryByTable } = require("../service/qrCode.service");
//获取小程序码
const { getQRCode } = require("../request/roCode");
const { uploadBucketOSS } = require("../utils/oss");
const { generateFileName, format } = require("../utils/utils");
const { TABLE_NUMBER_ALREADY_EXISTS } = require("../constants/error-types")

//查询二维码是否存在
const qrCodeExits = async(ctx,next) => {
    const { table } = ctx.request.body;
    try {
        const {data} = await queryByTable(table);
        //如果二维码已经存在
        if(data.length) return ctx.app.emit("error",new Error(TABLE_NUMBER_ALREADY_EXISTS),ctx);
    } catch (error) {
        return ctx.app.emit("error",new Error(SERVER_ERROR),ctx);
    }
    ctx.table = table;
    await next();
}

const generateQRCode = async(ctx,next) => {
    try {
        const time = format();
        //调用小程序api生成二维码的二进制文件
        const result = await getQRCode(ctx.table);
        if(result){
            const buffer = Buffer.from(result);
            //将文件上传到阿里云
           const res = await uploadBucketOSS(`${generateFileName()}.jpg`,buffer);
           ctx.imgUrl = res.url;
           ctx.time = time;
        }
        // console.log("二维码=,",result);
    } catch (error) {
        return ctx.app.emit("error",new Error(SERVER_ERROR),ctx);
    }
    await next();
}

module.exports = {
    qrCodeExits,
    generateQRCode 
}