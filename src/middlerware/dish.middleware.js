//菜品中间件
const Result = require("../app/result");
const { DISHUNIT_IS_EXIST, DISH_IS_EXIST, DISH_IS_NOT_EXIST } = require("../constants/error-types");
const { queryDishUnitByLabel , queryDishByCategoryName , queryDishByIdAndCid } = require("../service/dish.service");

//查询单位是否存在
const queryDishByUnit = async(ctx,next) => {
   const { unit } = ctx.request.body;
   try {
    const { data } = await queryDishUnitByLabel(unit);
    if(data.length) return ctx.app.emit("error",new Error(DISHUNIT_IS_EXIST),ctx);
   } catch (error) {
    return ctx.app.emit("error",new Error(SERVER_ERROR),ctx);
   }
   await next();
}

//查询当前分类下菜品是否存在
const queryDishByCategoryAndName = async(ctx,next) => {
   const { category , name   } = ctx.request.body;
   try {
    const { data } = await queryDishByCategoryName(category,name);
    if(data.length) return ctx.app.emit("error",new Error(DISH_IS_EXIST),ctx);
   } catch (error) {
    return ctx.app.emit("error",new Error(SERVER_ERROR),ctx);
   }
   await next();
}

//查询菜品和分类是否存在
const queryDishByIdCid= async(ctx,next) => {
   const { id , value } = ctx.request.query;
   try {
      const { data } = await queryDishByIdAndCid(id,value);
      if(!data.length) return ctx.app.emit("error",DISH_IS_NOT_EXIST,ctx);
   } catch (error) {
      console.log("errpr=",error)
      return ctx.app.emit("error",new Error(SERVER_ERROR),ctx);
   }
   await next();
}

module.exports = {
    queryDishByUnit,
    queryDishByCategoryAndName,
    queryDishByIdCid
}