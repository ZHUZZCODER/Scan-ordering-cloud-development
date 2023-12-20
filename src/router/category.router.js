//菜品路由
const Router = require("@koa/router");
const router = new Router();
//验证token中间件
const { verifyToken } = require("../middlerware/login.middleware");
//提交信息验证
const { validator , validatorQuery} = require("../middlerware/validator.middleware");
//菜品分类操作
const { createCategory  , queryCategoryPage }  = require("../controller/category.controller");
//菜品分类中间件
const { queryCategory } = require("../middlerware/category.middleware");


//添加菜品分类
router.post("/addcategory",verifyToken,validator("categoryAdd"),queryCategory,createCategory);

//获取菜品分类,分页// 关于分页：小程序一次性返回20条数据。nodejs端一次性返回10条；云函数端一次性返回100条
router.get("/obtaincate",verifyToken,validatorQuery("categoryPage"),queryCategoryPage);


module.exports = router

