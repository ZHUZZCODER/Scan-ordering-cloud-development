/**
 * 进行数据类型验证json schema 校验
 */
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
//将自定义错误信息的ajv-errors添加到ajv
require("ajv-errors")(ajv);
const {
  schema_user,
  schema_merchantInfo,
  schema_merchantInfoEdit,
  schema_categoryAdd,
  schema_categoryPage,
  schema_dishUnitAdd,
  schema_dishPutaway,
  schema_pullDishes,
  schema_dishEdit,
  schema_qrCodeAdd,
  schema_orderQuery,
  schema_viewOrder,
  schema_Checkout
} = require("../constants/json_schema");
ajv.addSchema(schema_user, "user");
ajv.addSchema(schema_merchantInfo, "merchantInfo");
ajv.addSchema(schema_merchantInfoEdit,"merchantInfoEdit");
ajv.addSchema(schema_categoryAdd,"categoryAdd");
ajv.addSchema(schema_categoryPage,"categoryPage");
ajv.addSchema(schema_dishUnitAdd,"dishUnitAdd");
ajv.addSchema(schema_dishPutaway,"dishPutaway");
ajv.addSchema(schema_pullDishes,"pullDishes");
ajv.addSchema(schema_dishEdit,"dishEdit");
ajv.addSchema(schema_qrCodeAdd,"qrCodeAdd");
ajv.addSchema(schema_orderQuery,"orderQuery");
ajv.addSchema(schema_viewOrder,"viewOrder");
ajv.addSchema(schema_Checkout,"checkout");

/**
 * json schema验证函数
 */
const validateFn = (schemaName, data) => {
  try {
    const validate = ajv.getSchema(schemaName);
    const valid = validate(data);
    if (!valid) return validate.errors[0];
  } catch (error) {
    console.log("ajvError=", error);
  }
};

module.exports = validateFn;
