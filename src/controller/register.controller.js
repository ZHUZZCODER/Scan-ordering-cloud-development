const Result = require("../app/result");
const RegisterService = require("../service/register.service");
const { SERVER_ERROR } = require("../constants/error-types");
//操作service
class RegisterController {
  //创建用户
  async create(ctx, next) {
    try {
      const { account, password } = ctx.request.body;
      const result = await RegisterService.create({
        uid: new Date().getTime(),
        account,
        password,
      });
      if (result.errcode === 0) new Result(ctx).getResult();
    } catch (error) {
      return ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
    }
  }
}

module.exports = new RegisterController();
