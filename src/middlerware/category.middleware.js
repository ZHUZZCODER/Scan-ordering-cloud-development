const Result = require("../app/result");
const { SERVER_ERROR, CATEGORY_IS_EXIST } = require("../constants/error-types");
const { queryByCategory } = require("../service/category.service");
//查询分类是否存在
const queryCategory = async(ctx,next) => {
    const { category } = ctx.request.body;
    try {
        const { data } = await queryByCategory(category);
        if(data.length) return ctx.app.emit("error",new Error(CATEGORY_IS_EXIST),ctx);
    } catch (error) {
        return ctx.app.emit("error",new Error(SERVER_ERROR),ctx);
    }
    await next();
}

module.exports = {
    queryCategory
}