const Router = require("@koa/router");
const router = new Router({ prefix: "/login" });
const { verifyLogin } = require("../middlerware/login.middleware");
const { login } = require("../controller/login.controller");
const { validator } = require("../middlerware/validator.middleware");

router.post("/", validator("user"), verifyLogin, login);

module.exports = router;
