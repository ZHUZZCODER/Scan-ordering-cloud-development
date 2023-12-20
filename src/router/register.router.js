const Router = require("@koa/router");
const router = new Router({ prefix: "/register" });
const { verifyUser } = require("../middlerware/register.midderware");
const { create } = require("../controller/register.controller");

router.post("/", verifyUser, create);

module.exports = router;
