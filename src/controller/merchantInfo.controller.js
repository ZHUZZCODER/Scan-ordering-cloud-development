const { uploadBucketOSS } = require("../utils/oss");
const Result = require("../app/result");
const { SERVER_ERROR } = require("../constants/error-types");
const {
  create,
  queryById,
  update,
} = require("../service/merchantInfo.service");
class MerchantInfoController {
  //保存图片上传到阿里云oss
  async saveMerchantInfoUpload(ctx, next) {
    const { filename, path } = ctx.file;
    try {
      const result = await uploadBucketOSS(filename, path);
      new Result(ctx, "SUCCESS", 200, result.url).getResult();
    } catch (error) {
      ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
    }
  }

  //上传商家信息
  async createMerchantInfo(ctx, next) {
    const { name, address, logo } = ctx.request.body;
    try {
      const result = await create(ctx.auth.uid, name, address, logo);
      new Result(ctx, "提交成功").getResult();
    } catch (error) {
      ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
    }
  }

  //获取商家信息
  async getMerchantInfo(ctx, next) {
    try {
      let { data } = await queryById(ctx.auth.uid);
      console.log("data====",data)
      // data[0] = JSON.parse(data[0]);
      new Result(ctx, "SUCCESS", 200, data).getResult();
    } catch (error) {
      ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
    }
  }

  //更新商家信息
  async updateMerchantInfo(ctx, next) {
    const { id, name, address, logo } = ctx.request.body;
    try {
      const data = await update(id, name, address, logo);
      console.log("updateMerchantInfo=", data);
      new Result(ctx,"修改成功",200).getResult()
    } catch (error) {
      ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
    }
  }
}

module.exports = new MerchantInfoController();
