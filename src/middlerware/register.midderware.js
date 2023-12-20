const {
  NAME_OR_PASSWORD_IS_NULL,
  MOBILE_PHONE_NUMBER_FORMAT_IS_INCORRECT,
  PASSWORD_FORMAT_IS_INCORRECT,
  USER_IS_EXIST,
} = require("../constants/error-types");
const { checkPhone, checkPassword } = require("../utils/utils");
const { query } = require("../service/register.service");

const Result = require("../app/result");

//验证用户中间件
const verifyUser = async (ctx, next) => {
  const { account, password } = ctx.request.body;
  //判断用户名密码是否为空
  if (!account || !password) {
    return ctx.app.emit("error", new Error(NAME_OR_PASSWORD_IS_NULL), ctx);
  }
  //检查用户名
  if (!checkPhone(account)) {
    return ctx.app.emit(
      "error",
      new Error(MOBILE_PHONE_NUMBER_FORMAT_IS_INCORRECT),
      ctx
    );
  }
  //检查密码
  if (!checkPassword(password)) {
    return ctx.app.emit("error", new Error(PASSWORD_FORMAT_IS_INCORRECT), ctx);
  }
  //查询用户是否存在
  // db.collection(\"geo\").where({done:true}).limit(10).skip(1).get()
  const result = await query(account);

  //如果用户存在，返回错误
  if (result.data.length) {
    //如果用户存在
    return ctx.app.emit("error", new Error(USER_IS_EXIST), ctx);
  }
  await next();
};

module.exports = {
  verifyUser,
};
