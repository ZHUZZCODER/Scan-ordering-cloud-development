const axios = require("axios");

class ZHURequest {
  constructor(config) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("config=", config);
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
      
        return res.data;
      },
      async (err) => {
        // console.log("err=", err);
        return err;
      }
    );
  }

  request(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor)
            res = config.interceptors.responseInterceptor(res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          return err;
        });
    });
  }

  post(config) {
    return this.request({ ...config, method: "POST" });
  }

  //二进制文件类型
  postArrayBuffer(config){//postArrayBuffer
    return this.request({...config,method: 'POST',responseType: "arraybuffer"});
  }

  get(config) {
    return this.request({ ...config, method: "GET" });
  }
}

module.exports = ZHURequest;
