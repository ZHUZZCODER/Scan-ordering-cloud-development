const { queryByDate } = require("../service/statistics.service");
const Result = require("../app/result");
const { getTimeMSUnix , removeSameByKey , listSort} = require("../utils/utils");

class StatisticsController{
    //查询七天数据
    async queryBySevenDay(ctx,next){
      try {
        const datelist = ctx.dateList;
        const { data } = await queryByDate(datelist);
        //生成补充的时间数据
        const defaultDate = datelist.map((item)=> ({sales_valume:0,time:item,unix:getTimeMSUnix(item)}));
        //将两个数组合成一个数组
        const allDate = [...data,...defaultDate];
        //对数组去重
        const list = removeSameByKey(allDate,"time");
        //数组排序
        listSort(list,"unix");
        return new Result(ctx,"SUCCESS",200,list).getResult();
      } catch (error) {
        ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
      }
    
    }
}

module.exports = new StatisticsController();