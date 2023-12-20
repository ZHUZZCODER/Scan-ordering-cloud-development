const Router = require("@koa/router");
const router = new Router();
const {
  merchantInfoUpload,
  verifyShopInfo,
  verifyMerchantInfo,
} = require("../middlerware/merchantInfo.middleware");
const {
  saveMerchantInfoUpload,
  createMerchantInfo,
  getMerchantInfo,
  updateMerchantInfo,
} = require("../controller/merchantInfo.controller");
const { verifyToken } = require("../middlerware/login.middleware");
//商家信息验证
const { validator } = require("../middlerware/validator.middleware");

//除注册登录外所有接口都需要验证token
//图片上传接口
router.post(
  "/uploadres",
  // verifyToken,
  merchantInfoUpload,
  saveMerchantInfoUpload
);

//商家信息上传接口
router.post(
  "/uploadshop",
  verifyToken,
  validator("merchantInfo"),
  verifyShopInfo,
  createMerchantInfo
);

//获取商家信息
router.get("/obtainshop", verifyToken, getMerchantInfo);

//修改商家信息
router.post("/modifyshop", verifyToken,validator("merchantInfoEdit"),
// verifyMerchantInfo,
 updateMerchantInfo);

module.exports = router;
