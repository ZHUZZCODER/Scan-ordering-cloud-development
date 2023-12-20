const jwt = require("jsonwebtoken");
const {
  NAME_OR_PASSWORD_IS_NULL,
  USER_IS_NOT_EXIST,
  WRONG_PASSWORD,
  NO_ACCESS,
  ACCOUNT_EXPIRED,
  SERVER_ERROR,
} = require("../constants/error-types");
const { PUBLICKEY } = require("../app/config");
const { query } = require("../service/register.service");

//登录拦截中间件
const verifyLogin = async (ctx, next) => {
  const { account, password } = ctx.request.body;
 
  //判断用户名密码是否为空
  // if (!account || !password) {
  //   return ctx.app.emit("error", new Error(NAME_OR_PASSWORD_IS_NULL), ctx);
  // }
  //判断用户是否存在
  const { data } = await query(account);
  if (!data.length)
    return ctx.app.emit("error", new Error(USER_IS_NOT_EXIST), ctx);
  const user = data[0];
  //判断密码是否正确
  if (password !== user.password) {
    return ctx.app.emit("error", WRONG_PASSWORD, ctx);
  }
  ctx.user = user;

  await next();
};

//验证token
const verifyToken = async (ctx, next) => {
  //获取请求投token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", new Error(NO_ACCESS), ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const { uid } = jwt.verify(token, PUBLICKEY, {
      algorithms: ["RS256"],
    });
    console.log("tokenUid=", uid);
    //存储验证通过uid
    ctx.auth = {
      uid,
    };
  } catch (error) {
    //如果是账号过期
    if (error.name === "TokenExpiredError") {
      return ctx.app.emit("error", new Error(ACCOUNT_EXPIRED), ctx);
    }
    //没有权限访问
    return ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
  }
  console.log("login")
  await next();
};

module.exports = {
  verifyLogin,
  verifyToken,
};
