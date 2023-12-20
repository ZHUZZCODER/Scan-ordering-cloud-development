const app = require("./app");
const { PORT } = require("./app/config");
const { getToken } = require("./request/token");

app.listen(PORT, () => {
  console.log("koa服务启动成功!", PORT);
  // getToken().then((res) => {
  //   console.log(res);
  // });
});
