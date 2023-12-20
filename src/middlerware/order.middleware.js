const { queryById } = require("../service/order.service");
const {  ORDER_IS_NOT_EXIST, SERVER_ERROR } = require("../constants/error-types");
const Price = require("e-commerce_price");
const { format } = require("../utils/utils");
const { sendMessage } = require("../request/sendMessage");
//查询订单是否存在
const queryOrderExits = async(ctx,next) => {
    const { id } = ctx.request.query;
    try {
        const {data} = await queryById(id);
        if(data && !data.length) return ctx.app.emit("error",new Error(ORDER_IS_NOT_EXIST),ctx);
    } catch (error) {
        return ctx.app.emit("error",new Error(SERVER_ERROR),ctx);
    }
   
    await next();
}

//对价格进行处理，并订阅消息
const handleOrderPriceSubscribe = async(ctx,next) => {
     const  {id,openid,sett_amount,order_no} = ctx.request.query;
     //处理价格
     const parsePrice = Price(parseInt(sett_amount));
     //生成时间
     const time = format();
     const data = {'amount3':{'value':parsePrice},'time4':{'value':time},'character_string1':{'value':order_no}};
     //发送订阅消息
     try{
       await sendMessage(openid,data);
     }catch(error){
       return ctx.app.emit("error",new Error(SERVER_ERROR),ctx);
     }
     await next();
}

module.exports = {
    queryOrderExits,
    handleOrderPriceSubscribe
}