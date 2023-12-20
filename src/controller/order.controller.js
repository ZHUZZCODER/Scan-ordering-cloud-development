const Result = require("../app/result");
const { queryPageAndTransac_status  , queryById , receivingById , checkoutOrder} = require("../service/order.service");
class OrderController{
    //查询所有或根据订单状态分页查询
    async queryAllByPageAndschemaTransacStatus(ctx,next){
       const { page , transac_status } = ctx.request.query;
       const requestParams = {}
       if(transac_status){
        requestParams["transac_status"] = transac_status;
       }
       try {
        const { data: result , pager: {Total: total} } = await queryPageAndTransac_status(requestParams,page);
        return new Result(ctx,"SUCCESS",200,{result,total}).getResult();
       } catch (error) {
        ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
       }
    }

    //通过id查询
    async queryDataById(ctx,next){
       const { id } = ctx.request.query;
       try {
        const { data: [{menu}] } = await queryById(id);
        return new Result(ctx,"SUCCESS",200,menu).getResult();
       } catch (error) {
        ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
       }
    }

    //接单
    async receivingOrder(ctx,next){
       const { id } = ctx.request.query;
       try {
        const { data } = await receivingById(id);
        return new Result(ctx,"SUCCESS",200).getResult();
       } catch (error) {
        console.log("err====",error)
        ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
       }
    }

    //结账
    async checkoutOrderStatus(ctx,next){
        const { id } = ctx.request.query;
        try {
            const result = await checkoutOrder(id);
            return new Result(ctx,"结账成功",200).getResult();
        } catch (error) {
            ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
        }
    }
}

module.exports = new OrderController();