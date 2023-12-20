//数据统计中间件
const {  getOffsetDay } = require("../utils/utils");
//生成七天
const generateSevenDay = async(ctx,next) => {
   //获取最近七天日期
   const indexArr = new Array(7).fill("");
   const dateList = indexArr.map((item,index)=>{
    return getOffsetDay(new Date(),"YYYY-MM-DD",index);
   });
   ctx.dateList =dateList;
   await next();
}

module.exports = {
    generateSevenDay
}