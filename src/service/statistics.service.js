const { databaseQuery } = require("../request/database");

//统计service
class StatisticsService{
    //查询前七天数据
    async queryByDate(timeArr){
       const result = await databaseQuery(`db.collection("seven_days_sales").where({time: db.command.in(${JSON.stringify(timeArr)})}).orderBy("time","asc").field({time:true,sales_valume:true}).get()`);
       return result;
  }
}

module.exports = new StatisticsService();