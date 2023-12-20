const { databaseQuery, databaseAdd } = require("../request/database");
//注册接口服务，操作数据库
class UserService {
  async create({ uid, account, password }) {
    const result = await databaseAdd(
      `db.collection("business-acc").add({data: {
          uid: "${uid}",
          account: "${account}",
          password: "${password}",
        } })`
    );
    return result;
  }

  async query(account) {
    const result = await databaseQuery(
      `db.collection("business-acc").where({account: "${account}"}).get()`
    );
    return result;
  }
}

module.exports = new UserService();
