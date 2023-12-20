const ZHURequest = require("./request");
const { BASE_URL, TIME_OUT , ACCESS_TOKEN_URL } = require("../app/config");
const { isString, transformArray,  isDefined } = require("../utils/utils");
const { getToken } = require("./token");
const zhuRequest = new ZHURequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: async(config) => {
       const { url ,params } = config;
       if(url !== ACCESS_TOKEN_URL){
            const { access_token } = await getToken();
          if(params){
            config["params"]["access_token"] = access_token;
          }else{
            config['params'] = {
              access_token: access_token
            }
          }
          
       }
       return config;
    }, 
    requestInterceptorsCatch: (err)=> {
       return err;
    },
    responseInterceptor: (res) => {
      console.log("res.data=",res.data)
      if(res.data.errcode && res.data.errcode !== 0){
        console.log("reject");
        return Promise.reject(res.data);
      }
      //将res.data.data中数据类型进行转换
      if(Array.isArray(res.data.data) && !!res.data.data.length){
        console.log("数据转换")
        res.data.data = transformArray(res.data.data);
      }
      console.log("sussess");
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    }
  }
});

module.exports = {
  zhuRequest,
};
