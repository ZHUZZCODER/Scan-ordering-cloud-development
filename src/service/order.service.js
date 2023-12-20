const { databaseQuery, databaseUpdate } = require("../request/database");

class OrderService{
    //通过订单状态分页查询
    async queryPageAndTransac_status(queryParams,page){
        const result = await databaseQuery(`db.collection('order-data').where(${JSON.stringify(queryParams)}).orderBy('order_time','desc').field({menu: false}).limit(10).skip(${page * 10}).get()`);
        return result;
    }

    //通过订单id查询
    async queryById(id){
        const result = await databaseQuery(`db.collection('order-data').doc('${id}').field({menu:true}).get()`);
        return result;
    }

    //接单
    async receivingById(id){
        const result = await databaseUpdate(`db.collection('order-data').doc('${id}').update({data:{order_receiving:'rec_order'}})`);
        return result;
    }

    //结账
    async checkoutOrder(id){
        const result = await databaseUpdate(`db.collection('order-data').doc('${id}').update({data: {transac_status: 'success'}})`);
        return result;
    }
}

module.exports = new OrderService();