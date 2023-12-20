const Result = require("../app/result");
const { generateToken } = require("../utils/utils");
//操作登录service
class LoginController {
  login(ctx, next) {
    const { uid, account } = ctx.user;

    const token = generateToken({
      uid,
      account,
    });
    return new Result(ctx, "登录成功", 200, { token }).getResult();
  }
}

module.exports = new LoginController();
