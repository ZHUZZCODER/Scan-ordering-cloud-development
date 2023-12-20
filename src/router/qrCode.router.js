const Router = require("@koa/router");
const router = new Router();
//验证token中间件
const { verifyToken } = require("../middlerware/login.middleware");
const { validator, validatorQuery } = require("../middlerware/validator.middleware");
const { qrCodeExits ,  generateQRCode  } = require("../middlerware/qrCode.middleware");
const { create , queryPage } = require("../controller/qrCode.controller");
 
//添加桌号
/**
 * 添加桌号：参数table
 * （1）先判断小程序码是否存在
 * （2）不存在，则调用小程序码api创建小程序码
 * （3）存储数据库
 * （4）返回给前端
 */
router.post("/qrcode",verifyToken,validator("qrCodeAdd"),qrCodeExits, generateQRCode ,create);

//查询所有桌号categoryPage
router.get("/getqrcode",verifyToken,validatorQuery("categoryPage"),queryPage);


module.exports = router;