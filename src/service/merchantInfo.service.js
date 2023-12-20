const {
  databaseAdd,
  databaseQuery,
  databaseUpdate,
} = require("../request/database");
class MerchantInfoService {
  //上传商家信息
  async create(uid, name, address, logo) {
    const result = await databaseAdd(`db.collection("shop-infor").add({data : {
          uid: "${uid}",
          name: "${name}",
          address: "${address}",
          logo: ${logo}
    }})`);
    return result;
  }

  //根据uid查询商家信息
  async queryById(uid) {
    const result = await databaseQuery(
      `db.collection("shop-infor").where({uid: "${uid}"}).get()`
    );
    return result;
  }

  //更新商家信息
  async update(id, name, address, logo) {
    const result =
      await databaseUpdate(`db.collection("shop-infor").where({_id: "${id}" }).update({data:{
        name: "${name}",
        address: "${address}",
        logo: "${logo}"
     }})`);
    return result;
  }
}

module.exports = new MerchantInfoService();
