const { databaseAdd, databaseQuery, databaseUpdate } = require("../request/database");
//菜品分类服务
class CategoryService{
    //创建菜品类目
   async create({value,
    label,
    cid,
    count,
    sele_quantity}){
     const result = await databaseAdd(`db.collection("dishes-category").add({ data: { label : "${label}", value: "${value}" , cid: "${cid}" , count: ${count} , sele_quantity: ${sele_quantity}} })`);
     return result;
   }

   //查询菜品类目,通过category
   async queryByCategory(category){
    const result = await databaseQuery(`db.collection("dishes-category").where({label: "${category}"}).get()`);
    return result;
   }

   //查询菜品类目，分页
   async queryPage(page){
     const result = await databaseQuery(`db.collection("dishes-category").orderBy('cid', 'desc').limit(10).skip(${page * 10}).get()`);
     return result;
   }

     //更新菜品分类下数量count
     async updateCategoryCount(cid,count){
      console.log(typeof cid)
        const countVal = `_.inc(${count})`
        const result = await databaseUpdate(`db.collection("dishes-category").where({cid: "${cid}"}).update({data:{count: ${countVal}}})`);
        return result;
     }


    
}

module.exports = new CategoryService();