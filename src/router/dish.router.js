//菜品路由
const Router = require("@koa/router");
const router = new Router();
//验证token中间件
const { verifyToken } = require("../middlerware/login.middleware");
const { queryDishUnit ,addDishUnit , createDish , queryDishAllByPage , updateDishOnsaleAndCategoryCount , updateDish } = require("../controller/dish.controller");
const { validator , validatorQuery } = require("../middlerware/validator.middleware");
const { queryDishByUnit , queryDishByCategoryAndName, queryDishByIdCid } = require("../middlerware/dish.middleware");

//获取菜品单位
router.get("/obtainunit",verifyToken,queryDishUnit);

//添加菜品单位
router.post("/dishunit",verifyToken,validator("dishUnitAdd"),queryDishByUnit,addDishUnit);

//dishPutaway
//上架菜品
router.post("/uploaddishes",verifyToken,validator("dishPutaway"),queryDishByCategoryAndName,createDish);

//查询所有菜品数据
router.get("/obtaindishes",verifyToken,validatorQuery("categoryPage"),queryDishAllByPage);

//下架菜品，根据菜品_id和分类cid，菜品下架状态，菜品分类数量-1
router.get("/fromsale",verifyToken,validatorQuery("pullDishes"),queryDishByIdCid,updateDishOnsaleAndCategoryCount);

//编辑菜品
router.post("/modifydishes",verifyToken,validator("dishEdit"),updateDish);

module.exports = router;