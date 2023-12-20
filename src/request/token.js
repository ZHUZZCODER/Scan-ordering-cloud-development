const { zhuRequest } = require("./index");
const  axios = require("axios");
const { GRANT_TYPE, APPID, SECRET , ACCESS_TOKEN_URL , BASE_URL} = require("../app/config");
const { error } = require("ajv/dist/vocabularies/applicator/dependencies");
const api = axios.create({baseURL: BASE_URL})

const getToken = () => {
  return new Promise((resolve,reject)=>{
    api.request({
      url: `${ACCESS_TOKEN_URL}`,
      params: {
        grant_type: GRANT_TYPE,
        appid: APPID,
        secret: SECRET,
      },
      method: 'GET'
    }).then(res=>{
       resolve(res.data);
    }).catch(err=>{
       reject(error);
    });
  })
 
};

module.exports = {
  getToken,
};
