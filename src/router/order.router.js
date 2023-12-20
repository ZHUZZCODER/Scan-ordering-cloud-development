//订单路由
const Router = require("@koa/router");
const { verifyToken } = require("../middlerware/login.middleware");
const { validatorQuery } = require("../middlerware/validator.middleware");
const { queryAllByPageAndschemaTransacStatus , queryDataById , receivingOrder , checkoutOrderStatus } = require("../controller/order.controller");
const { queryOrderExits , handleOrderPriceSubscribe } = require("../middlerware/order.middleware");
const router = new Router();

//获取订单：所有、未结账、已结账
router.get("/obtainorder",verifyToken,validatorQuery("orderQuery"),queryAllByPageAndschemaTransacStatus);

//查看详细菜单
router.get("/vieworder",verifyToken,validatorQuery("viewOrder"),queryDataById);

//接单
router.post("/receiving",verifyToken,validatorQuery("viewOrder"),queryOrderExits,receivingOrder);

//结账并订阅消息
router.get("/checkout",verifyToken,handleOrderPriceSubscribe,checkoutOrderStatus);


module.exports = router;