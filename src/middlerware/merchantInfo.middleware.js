const multer = require("@koa/multer");
const { merchantInfoPath } = require("../constants/file-path");
const { CheckUtils } = require("../utils/check");
const {
  PLEASE_ENTER_THE_STORE_NAME,
  PLEASE_ENTER_THE_STORE_ADDRESS,
  PLEASE_UPLOAD_THE_STORE_LOGO,
  MERCHANT_ALREADY_EXISTS,
} = require("../constants/error-types");
const {
  isNullArray,
  isUndefined,
  isSpace,
  isArray,
  isDefined,
  generateFileName
} = require("../utils/utils");
const { queryById } = require("../service/merchantInfo.service");

//设置文件上传位置和格式
//也可直接上传，然后拼接返回给用户
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, merchantInfoPath);
  },
  filename: (req, file, cb) => {
    const imgFormat = file.originalname.split(".").slice(-1);
    const filename = `${generateFileName()}.${imgFormat}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: diskStorage });

//文件上传中间件,单文件
const merchantInfoUpload = upload.single("file");

//商家信息上传的校验
class VerifyShopInfor extends CheckUtils {
  constructor(ctx, ...args) {
    super(ctx, ...args);
    const errMsgList = [
      PLEASE_ENTER_THE_STORE_NAME,
      PLEASE_ENTER_THE_STORE_ADDRESS,
      PLEASE_UPLOAD_THE_STORE_LOGO,
    ];

    //验证空格
    if (super.verityBlank(errMsgList)) return;
    //验证空字符串、null、undefined
    if (super.verityNullStringUndefined(errMsgList)) return;
    //验证数组是否为空
    if (!isNullArray(this.args[2])) {
      this.ctx.app.emit(
        "error",
        new Error(PLEASE_UPLOAD_THE_STORE_LOGO),
        this.ctx
      );
      return;
    }
  }
}

//查询商家信息是否存在
const verifyShopInfo = async (ctx, next) => {
  // const { name, address, logo } = ctx.request.body;
  //注释数据验证改用ajv验证
  // //验证数据格式
  // new VerifyShopInfor(ctx, name, address, logo);
  //查询商家信息是否存在
  const { data } = await queryById(ctx.auth.uid);
  //如果商家信息不存在
  if (data.length) {
    return ctx.app.emit("error", new Error(MERCHANT_ALREADY_EXISTS), ctx);
  }
  await next();
};

//更新信息验证
const verifyMerchantInfo = async (ctx, next) => {
  // const { id, name, address, logo } = ctx.request.body;
  // console.log("id=", id);
  // if (!id) return ctx.app.emit("error", new Error(ID_IS_NULL), ctx);
  // if (isDefined(name) && isSpace(name))
  //   return ctx.app.emit("error", new Error(PLEASE_ENTER_THE_STORE_NAME), ctx);
  // if (isDefined(address) && isSpace(address))
  //   return ctx.app.emit(
  //     "error",
  //     new Error(PLEASE_ENTER_THE_STORE_ADDRESS),
  //     ctx
  //   );
  // if (isArray(logo) && !logo.length)
  //   return ctx.app.emit("error", new Error(PLEASE_UPLOAD_THE_STORE_LOGO), ctx);
  await next();
};

module.exports = {
  merchantInfoUpload,
  verifyShopInfo,
  verifyMerchantInfo,
};
