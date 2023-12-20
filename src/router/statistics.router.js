const Router = require("@koa/router");
const router = new Router();
const { verifyToken } = require("../middlerware/login.middleware");
const {  generateSevenDay } = require("../middlerware/statistics.middleware");
const { queryBySevenDay } = require("../controller/statistics.controller");


//获取七天销售额
router.get("/salesvolume",verifyToken, generateSevenDay,queryBySevenDay);

module.exports = router;