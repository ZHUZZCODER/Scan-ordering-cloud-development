const { zhuRequest } = require("./index");
const { getToken } = require("./token");
const { GRANT_TYPE, APPID, SECRET, ENV_ID ,  REQUEST_URL } = require("../app/config");

//查询记录
const databaseQuery = async (query = "") => {
  return zhuRequest.post({
    url: `${REQUEST_URL}/databasequery`,
    data: {
      env: ENV_ID,
      query,
    },
  });
};

//添加记录
const databaseAdd = async (query = "") => {
  return zhuRequest.post({
    url: `${REQUEST_URL}/databaseadd`,
    data: {
      env: ENV_ID,
      query,
    },
  });
};

//更新记录
const databaseUpdate = async (query = "") => {
  return zhuRequest.post({
    url: `${REQUEST_URL}/databaseupdate`,
    data: {
      env: ENV_ID,
      query,
    },
  });
};

module.exports = {
  databaseQuery,
  databaseAdd,
  databaseUpdate,
};
