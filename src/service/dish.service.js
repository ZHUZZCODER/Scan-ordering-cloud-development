const { databaseQuery, databaseAdd, databaseUpdate } = require("../request/database");

class DishService{
     //查询
    async queryDishUnit(){
      const result = await databaseQuery(`db.collection("dishunit").get()`);
      return result;
   }

   //条件查询
   async queryDishUnitByLabel(unit){
     const result = await databaseQuery(`db.collection("dishunit").where({ label: "${unit}" }).get()`);
     return result;
   }

   //添加菜品单位
   async addDishUnit(unit,uid){
      const result = await databaseAdd(`db.collection("dishunit").add({data: {
        label: "${unit}",
        value: "${unit}",
        uid: "${uid}"
      }})`);
      return result;
   }

   //通过菜品分类和名称查询菜品
   async queryDishByCategoryName(category,name){
      const result = await databaseQuery(`db.collection("dishes-data").where({category: "${category}",name: "${name}"}).get()`);
      return result;
   }

 

   //添加分类下菜品
   async addDish(fish){
      console.log("sql=",`db.collection("dishes-data").add({data: ${JSON.stringify({...fish,quantity: 0,onsale: true, monthlysale:0})}})`)
      const result = await databaseAdd(`db.collection("dishes-data").add({data: ${JSON.stringify({...fish,quantity: 0,onsale: true, monthlysale:0})}})`);
      return result;
   }

   //查询所有菜品数据分页
   async queryDishPage(page){
      const result = await databaseQuery(`db.collection("dishes-data").orderBy('time', 'desc').limit(10).skip(${page * 10}).get()`);
      return result;
   }

   //查询菜品通过_id和cid
   async queryDishByIdAndCid(id,cid){
      console.log(typeof cid)
      const result = await databaseQuery(`db.collection("dishes-data").where({cid: "${cid}",_id: "${id}"}).get()`);
      return result;
   }

   //更新dish的onscale
   async updateDishOnScale(id){
      const result = await databaseUpdate(`db.collection("dishes-data").doc("${id}").update({data: { onsale: false }})`);
      return result;
   }

   //编辑菜品
   async updateDish({
      id,category,name,unitprice,unit,image,cid,time
   }){
      const result = await databaseUpdate(`db.collection("dishes-data").doc("${id}").update({data: {category: "${category}",name: "${name}",unitprice: ${unitprice},unit: "${unit}",cid: "${cid}",time: "${time}",image: ${JSON.stringify(image)}}})`);
      return result;
   }
}

module.exports = new DishService();