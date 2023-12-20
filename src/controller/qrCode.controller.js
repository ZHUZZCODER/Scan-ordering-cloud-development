const Result = require("../app/result");
const { createTableNumber , queryByPage }  = require("../service/qrCode.service");

class TableNumberController{
    //创建桌花
    async create(ctx,next){
      const { table , imgUrl, time } = ctx;
      try {
        const result = await createTableNumber(table,time,imgUrl);
        return new Result(ctx,"SUCCESS").getResult();
      } catch (error) {
        ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
      }
    }

    //分页查询所有桌号
    async queryPage(ctx,next){
      const { page } = ctx.request.query;
      try {
        const { data: result , pager: {Total: total} } = await queryByPage(page);
        return new Result(ctx,"SUCCESS",200,{result,total}).getResult();
      } catch (error) {
        ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
      }
    }
}

module.exports = new TableNumberController();