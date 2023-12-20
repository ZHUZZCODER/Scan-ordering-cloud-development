###本项目是基于koa的点餐后端，主要用到的技术是koa，@koa-router，@koa-multer，ajv，ajv-errors，axios，dayjs，dotenv，jsonwebtoken，koa-bodyparser，koa2-cors，nodemon

###如何运行
(1)修改.env中
#订阅消息的模板id，这个是发生消息的，在微信公众平台的订阅消息，选择《商家确认订单通知》就会有模板id
TEMPLATE_ID = 
#appid，这个在微信公众平台的，开发管理和开发设置中有
APPID = 
#appSecret，这个在微信公众平台的，开发管理和开发设置中有
SECRET = 
#云数据库环境id , hbuilder运行小程序到微信开发者工具，创建一个云数据库
ENV_ID = 
#阿里云oss存储AccessKey, 这里自己去阿里云注册一个oss对象存储，新建一个桶，就有
ACCESS_KEY = 
ACCESS_KEY_SECRET = 
(2)Scan-ordering-clound-development执行： npm install
(3)然后执行: npm run start

###如有疑问可联系qq: 2337658094