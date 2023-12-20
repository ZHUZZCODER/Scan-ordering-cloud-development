const { databaseQuery, databaseAdd } = require("../request/database");

class QrCodeService{
    //通过桌号查询，桌号二维码是否存在
    async queryByTable(table){
       const result = await databaseQuery(`db.collection("table_qr_code").where({table: "${table}"}).get()`);
       return result;
    }

    //添加桌号：桌号，时间，img
    async createTableNumber(table,time,code){
       const result = await databaseAdd(`db.collection("table_qr_code").add({data: {
        time: "${time}",
        table: "${table}",
        code: "${code}"
       }})`);
       return result;
    }

    //分页查询桌号
    async queryByPage(page){
        const result = await databaseQuery(`db.collection("table_qr_code").orderBy("time","asc").limit(10).skip(${page * 10}).get()`);
        return result;
    }
}

module.exports = new QrCodeService();