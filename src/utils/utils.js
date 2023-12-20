const fs = require("fs");
const dotenv = require("dotenv");
// 解析.env.override中的配置项为一个对象
const envConfig = dotenv.parse(fs.readFileSync(".env"));
const jwt = require("jsonwebtoken");
const { PRIVATEKEY } = require("../app/config");
const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Shanghai");

//检查手机号歌手
const checkPhone = (phoneNumber) => {
  const regex = /^1[3-9][0-9]{9}$/;
  return regex.test(phoneNumber);
};

//检查密码是否是数字密码组合
const checkPassword = (password) => {
  const regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
  return regex.test(password);
};

//修改dot.env
const changeAccessToken = (accessTokenKey, accessTokenVal) => {
  Object.keys(envConfig).forEach((key) => {
    if (accessTokenKey === key) {
      process.env[key] = accessTokenVal;
    }
  });
};

//jsonwebtoken加密
const generateToken = (data, expiresIn = 60 * 60 * 24, algorithm = "RS256") => {
  const token = jwt.sign(data, PRIVATEKEY, {
    expiresIn,
    algorithm,
  });
  return token;
};

const isNumber = (num) => {
  return typeof num === "number";
};

const isArray = (list) => {
  return Array.isArray(list);
};

const isNullArray = (list) => {
  return isArray(list) && !!list.length;
};

const isUndefined = (val) => {
  return typeof val === "undefined";
};

const isString = (val) => {
  return typeof val === "string";
};

//是否包含空格
const isSpace = (val) => {
  return !val.split(" ").join("").length;
};

const isDefined = (val) => {
  return val !== undefined && val !== null;
};

//转换数组数据格式
const transformArray = (list) => {
  return list.map(item=> {
    if(isString(item)){
      item = JSON.parse(item)
    }
    return item;
  })
}


//生成时间戳
const generateTimeStamp = () => {
   return new Date().getTime();
}

//返回当前时间
const DEFAULT_FORMAT_TIME = "YYYY-MM-DD HH:mm:ss";
const format = (date = new Date(),format = DEFAULT_FORMAT_TIME) => {
   return dayjs(date).tz().format(format);
}

//获取前几天
const getOffsetDay = (date = new Date(),format  = DEFAULT_FORMAT_TIME,offset = 0) => {
  return dayjs(date).tz().subtract(offset,"d").format(format);
}

//获取时间戳毫秒
const getTimeMSUnix = (date = new Date()) => {
  return dayjs(date).tz().unix();
}

const generateFileName = () => {
  return `${Date.now()}-${Math.floor(
    Math.random() * 10000000
  )}`
}

//数组去重
const removeSameByKey = (list,key) => {
  const sameKey = [];
  const listResult = list.filter(item=>{
    if(!sameKey.includes(item[key])){
      sameKey.push(item[key]);
      return item;
    }
  })
  return listResult;
}

//数组对象排序
const listSort = (list,key) => {
     list.sort((a,b)=> a[key]  - b[key]);
}

module.exports = {
  checkPhone,
  checkPassword,
  changeAccessToken,
  generateToken,
  isNumber,
  isArray,
  isNullArray,
  isUndefined,
  isSpace,
  isDefined,
  transformArray,
  generateTimeStamp,
  format,
  isString,
  generateFileName,
  getOffsetDay,
  DEFAULT_FORMAT_TIME,
  getTimeMSUnix,
  removeSameByKey,
  listSort
};
