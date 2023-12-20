const errorTypes = require("../constants/error-types");
const Result = require("./result");
const errorHandle = (err, ctx) => {
  let status, msg;
  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_NULL:
      status = 400;
      msg = errorTypes.NAME_OR_PASSWORD_IS_NULL;
      break;
    case errorTypes.MOBILE_PHONE_NUMBER_FORMAT_IS_INCORRECT:
      status = 400;
      msg = errorTypes.MOBILE_PHONE_NUMBER_FORMAT_IS_INCORRECT;
      break;
    case errorTypes.PASSWORD_FORMAT_IS_INCORRECT:
      status = 400;
      msg = errorTypes.PASSWORD_FORMAT_IS_INCORRECT;
      break;
    case errorTypes.USER_IS_EXIST:
      status = 409;
      msg = errorTypes.USER_IS_EXIST;
      break;
    case errorTypes.SERVER_ERROR:
      status = 500;
      msg = errorTypes.SERVER_ERROR;
      break;
    case errorTypes.USER_IS_NOT_EXIST:
      status = 400;
      msg = errorTypes.USER_IS_NOT_EXIST;
      break;
    case errorTypes.WRONG_PASSWORD:
      status = 400;
      msg = errorTypes.WRONG_PASSWORD;
      break;
    case errorTypes.NO_ACCESS:
      status = 401;
      msg = errorTypes.NO_ACCESS;
      break;
    case errorTypes.ACCOUNT_EXPIRED:
      status = 401;
      msg = errorTypes.ACCOUNT_EXPIRED;
      break;
    case errorTypes.PLEASE_ENTER_THE_STORE_NAME:
      status = 400;
      msg = errorTypes.PLEASE_ENTER_THE_STORE_NAME;
      break;
    case errorTypes.PLEASE_ENTER_THE_STORE_ADDRESS:
      status = 400;
      msg = errorTypes.PLEASE_ENTER_THE_STORE_ADDRESS;
      break;
    case errorTypes.PLEASE_UPLOAD_THE_STORE_LOGO:
      status = 400;
      msg = errorTypes.PLEASE_UPLOAD_THE_STORE_LOGO;
      break;
    case errorTypes.MERCHANT_ALREADY_EXISTS:
      status = 400;
      msg = errorTypes.MERCHANT_ALREADY_EXISTS;
      break;
    case errorTypes.ID_IS_NULL:
      status = 400;
      msg = errorTypes.ID_IS_NULL;
      break;
    case errorTypes.CANNOT_CANTAIN_SPACES:
      status = 400;
      msg = errorTypes.CANNOT_CANTAIN_SPACES;
      break;
    case errorTypes.CATEGORY_IS_EXIST:
      status = 400;
      msg = errorTypes.CATEGORY_IS_EXIST;
      break;
    case errorTypes.DISHUNIT_IS_EXIST:
      status = 500;
      msg = errorTypes.DISHUNIT_IS_EXIST;
      break;
    case errorTypes.OBJECT_VALUE_IS_INVALID:
      status = 400;
      msg = errorTypes.OBJECT_VALUE_IS_INVALID;
      break;
    case errorTypes.CATEGORY_MUST_BE_STRING:
      status = 400;
      msg = errorTypes.CANNOT_CANTAIN_SPACES;
      break;
    case errorTypes.IMAGE_FORMAT_ERROR:
      status = 400;
      msg = errorTypes.IMAGE_FORMAT_ERROR;
      break;
    case errorTypes.DISHNAME_TYPE_ERROR:
      status = 400;
      msg = errorTypes.DISHNAME_TYPE_ERROR;
      break;
    case errorTypes.DISHUNITPRICE_TYPE_ERROR:
      status = 400;
      msg = errorTypes.DISHUNITPRICE_TYPE_ERROR;
      break;
    case errorTypes.DISHUNIT_TYPE_ERROR:
      status = 400;
      msg = errorTypes.DISHUNIT_TYPE_ERROR;
      break;
    case errorTypes.DISHCID_TYPE_ERROR:
      status = 400;
      msg = errorTypes.DISHCID_TYPE_ERROR;
      break;
    case errorTypes.DISH_IS_EXIST:
      status = 400;
      msg = errorTypes.DISH_IS_EXIST;
      break;
    case errorTypes.DISH_IS_NOT_EXIST:
      status = 500;
      msg = errorTypes.DISH_IS_NOT_EXIST;
      break;
    case errorTypes.TABLE_NUMBER_ALREADY_EXISTS:
      status = 500;
      msg = errorTypes.TABLE_NUMBER_ALREADY_EXISTS;
      break;
    case errorTypes.ORDER_IS_NOT_EXIST:
      status = 500;
      msg = errorTypes.ORDER_IS_NOT_EXIST;
      break;
    default:
      status = 404;
      msg = "NOT FOUND";
  }
  new Result(ctx, msg, status).getResult();
};

module.exports = errorHandle;
