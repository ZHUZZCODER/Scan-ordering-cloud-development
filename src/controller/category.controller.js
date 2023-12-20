const Result = require("../app/result");
const { SERVER_ERROR } = require("../constants/error-types");
const { create , queryPage } = require("../service/category.service");
const { generateTimeStamp, transformArray } = require("../utils/utils");

class CategroyController{
    //添加菜品分类
    async createCategory(ctx,next){
      const { category } = ctx.request.body;
      try {
        //创建菜品类目
        const result = await create({
           value: category,
           label: category,
           cid: `a${generateTimeStamp()}`,
           count: 0,
           sele_quantity: 0
        });
        new Result(ctx,'添加成功').getResult();
      } catch (error) {
        ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
      }
    }

    //分页查询商品分类
    async queryCategoryPage(ctx,next){
        const { page } = ctx.request.query;
      try {
        const { data , pager : { Total : total } } = await queryPage(page);
        const res = { result: data, total  };
        new Result(ctx,"SUCCESS",200,res).getResult();
      } catch (error) {
        ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
      }
    }
}

module.exports = new CategroyController();