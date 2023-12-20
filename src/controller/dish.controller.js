const Result = require("../app/result");
const { queryDishUnit, addDishUnit , addDish , queryDishPage ,updateDishOnScale , updateDish } = require("../service/dish.service");
const { updateCategoryCount } = require("../service/category.service");
const { generateTimeStamp, format } = require("../utils/utils");

class DishController{
    //查询所有菜品单位
    async queryDishUnit(ctx,next){
       try {
        const { data } = await queryDishUnit();
        return new Result(ctx,"SUCCESS",200,data).getResult();
       } catch (error) {
        ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
       }
    }

    //添加菜品耽误
    async addDishUnit(ctx,next){
       const { unit } = ctx.request.body;
       try {
        //添加菜
        const { data } = await addDishUnit(unit,generateTimeStamp());
        //分类下数量加一count
        return new Result(ctx,"添加成功").getResult();
       } catch (error) {
        ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
       }
     }

     //添加分类下菜品
     async createDish(ctx,next){
        const { category , image , name , unitprice , unit , value } = ctx.request.body;
        try {
            const result = await addDish({category,image: JSON.parse(image),name,unitprice,unit,cid: value , time: format()});
            //更新分类下，菜品数量
            const res = await updateCategoryCount(value,1);
            return new Result(ctx,"SUCCESS",200).getResult();
        } catch (error) {
            ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
        }
     }

     //查询所有菜品
     async queryDishAllByPage(ctx,next){
        const {  page } = ctx.request.query;
        try {
            const { data: result , pager: {Total: total} } = await queryDishPage(page);
            return new Result(ctx,"SUCCESS",200,{ result,total }).getResult()
        } catch (error) {
            ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
        }
     }

     //修改dish和category
     async updateDishOnsaleAndCategoryCount(ctx,next){
        const { id , value } = ctx.request.query;
        try {
            await updateDishOnScale(id);
            await updateCategoryCount(value,-1);
            return new Result(ctx,"SUCCESS").getResult();
        } catch (error) {
            console.log("error=",error)
            ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
        }
     }

     //编辑菜品
     async updateDish(ctx,next){
        const {id,category,name,unitprice,unit,image,value} = ctx.request.body;
        try {
            const result = await updateDish({ id ,category, name, unitprice,unit,image,cid: value, time: format()});
            return new Result(ctx,"SUCCESS").getResult();
        } catch (error) {
             console.log("error=",error)
             ctx.app.emit("error", new Error(SERVER_ERROR), ctx);
        }
     }
}

module.exports = new DishController()