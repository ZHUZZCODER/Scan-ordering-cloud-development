const Result = require("../app/result");
const validateFn = require("../utils/validate");
/**
 * json schema验证中间件
 */
const validator = (schemaname,requestKey = "body") => {
  const dataValidation = async (ctx, next) => {
    const data = ctx.request[requestKey];
    const error = validateFn(schemaname, data);
    if (error) {
      console.log("validatorError", error);
      if(error.keyword === "errorMessage") return ctx.app.emit("error", new Error(error.message), ctx);
      return new Result(ctx,error.message,400).getResult();
    }
    await next();
  };
  return dataValidation;
};

const validatorQuery = (schemaname) => {
  return validator(schemaname,"query");
}

module.exports = {
  validator,
  validatorQuery
};
