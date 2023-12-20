//阿里云存储服务

const OSS = require("ali-oss");
const { ACCESS_KEY, ACCESS_KEY_SECRET } = require("../app/config");

const client = new OSS({
  //地域
  region: "oss-cn-guangzhou",
  accessKeyId: ACCESS_KEY,
  accessKeySecret: ACCESS_KEY_SECRET,
  //存储桶子名称
  bucket: "eatimages",
});

const uploadBucketOSS = (filename, filepath) => {
  return new Promise((resolve, reject) => {
    client
      .put(filename, filepath)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  uploadBucketOSS,
};
