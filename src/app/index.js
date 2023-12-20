const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const registerRouter = require("../router/register.router");
const loginRouter = require("../router/login.router");
const merchantInfoRouter = require("../router/merchantInfo.router");
const categoryRouter = require("../router/category.router");
const dishRouter = require("../router/dish.router");
const qrCodeRouter = require("../router/qrCode.router");
const statisticsRouter = require("../router/statistics.router");
const orderRouter = require("../router/order.router");
const errorHandle = require("./errorHandle");

app.use(cors());
app.use(bodyParser());
app.use(registerRouter.routes());
app.use(registerRouter.allowedMethods());
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());
app.use(merchantInfoRouter.routes());
app.use(merchantInfoRouter.allowedMethods());
app.use(categoryRouter.routes());
app.use(categoryRouter.allowedMethods());
app.use(dishRouter.routes());
app.use(dishRouter.allowedMethods());
app.use(qrCodeRouter.routes());
app.use(qrCodeRouter.allowedMethods());
app.use(statisticsRouter.routes());
app.use(statisticsRouter.allowedMethods());
app.use(orderRouter.routes());
app.use(orderRouter.allowedMethods());
app.on("error", errorHandle);

module.exports = app;