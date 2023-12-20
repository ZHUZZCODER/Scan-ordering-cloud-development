const {
  MOBILE_PHONE_NUMBER_FORMAT_IS_INCORRECT,
  PASSWORD_FORMAT_IS_INCORRECT,
  PLEASE_ENTER_THE_STORE_NAME,
  PLEASE_ENTER_THE_STORE_ADDRESS,
  PLEASE_UPLOAD_THE_STORE_LOGO,
  ID_IS_NULL,
  CANNOT_CANTAIN_SPACES,
  OBJECT_VALUE_IS_INVALID,
  CATEGORY_MUST_BE_STRING,
  IMAGE_FORMAT_ERROR,
  DISHNAME_TYPE_ERROR,
  DISHUNITPRICE_TYPE_ERROR,
  DISHUNIT_TYPE_ERROR,
  DISHCID_TYPE_ERROR
} = require("./error-types");

//用户账号密码验证
const schema_user = {
  type: "object",
  properties: {
    account: {
      type: "string",
      pattern: "^1[3-9][0-9]{9}$",
      errorMessage: MOBILE_PHONE_NUMBER_FORMAT_IS_INCORRECT,
    },
    password: {
      type: "string",
      pattern: "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$",
      errorMessage: PASSWORD_FORMAT_IS_INCORRECT,
    },
  },
  required: ["account", "password"],
};

//商家信息验证
const schema_merchantInfo = {
  type: "object",
  properties: {
    name: {
      type: "string",
      //注意，在 JSON Schema 的字符串中，反斜杠需要被转义（即 \\s 代替 \s），这是因为 JSON 字符串自身就需要将反斜杠转义。
      pattern: "^[^\\s]+(\\s+[^\\s]+)*$",
      errorMessage: PLEASE_ENTER_THE_STORE_NAME,
    },
    address: {
      type: "string",
      pattern: "^[^\\s]+(\\s+[^\\s]+)*$",
      errorMessage: PLEASE_ENTER_THE_STORE_ADDRESS,
    },
    logo: {
      type: "string",
      // type: "array",
      // items: {
      //   type: "object",
      //   minProperties: 2,
      //   properties: {
      //     url: {
      //       type: "string"
      //     },
      //     uid: {
      //       type: "string"
      //     }
      //   },
      //   required: ["url","uid"]
      // },
      // maxItems: 1,
      errorMessage: PLEASE_UPLOAD_THE_STORE_LOGO,
    },
  },
  required: ["name", "address", "logo"],
};

//编辑商家信息验证
const schema_merchantInfoEdit = {
  type: "object",
  properties: {
    id: {
      type: "string",
      minLength: 1,
      errorMessage: ID_IS_NULL
    },
    name: {
      type: "string",
      //注意，在 JSON Schema 的字符串中，反斜杠需要被转义（即 \\s 代替 \s），这是因为 JSON 字符串自身就需要将反斜杠转义。
      pattern: "^[^\\s]+(\\s+[^\\s]+)*$",
      errorMessage: PLEASE_ENTER_THE_STORE_NAME,
    },
    address: {
      type: "string",
      pattern: "^[^\\s]+(\\s+[^\\s]+)*$",
      errorMessage: PLEASE_ENTER_THE_STORE_ADDRESS,
    },
    logo: {
      type: "string",
      // type: "array",
      // items: [{
      //   type: "object",
      //   minProperties: 2,
      //   maxProperties: 2,
      //   properties: {
      //     url: {
      //       type: "string"
      //     },
      //     uid: {
      //       type: "string"
      //     }
      //   },
      //   required: ["url","uid"]
      // }],
      // minItems: 1,
      // maxItems: 1,
      errorMessage: PLEASE_UPLOAD_THE_STORE_LOGO,
      //不允许数组有额外元素
      additionalItems: false
    },
  },
  required: ["id","name", "address", "logo"],
}

//新增菜品分类验证
const schema_categoryAdd = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  //要注意的是，就算你没有在 "required" 中列出所有属性，只要设置了 minProperties 为 1 或者更大的数字，任何空对象都将不会通过验证。如果设置了 "required" 字段，那么即使 minProperties 设得很小，也必须至少包含 "required" 中所有列举的属性。
  type: "object",
  minProperties: 1,
  maxProperties: 1,
  properties: {
    category: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
      errorMessage: CANNOT_CANTAIN_SPACES
    }
  },
  required: ["category"],
  additionalProperties: false
}

//菜品类目分页查询
const schema_categoryPage = {
  type: "object",
  minProperties: 1,
  maxProperties: 1,
  properties: {
    page: {
      type: "string",
      pattern: "^[0-9]*$"
    }
  },
  required: ["page"],
  additionalProperties: false
}

//菜品查询新增
const schema_dishUnitAdd = {
  type: "object",
  minProperties: 1,
  maxProperties: 1,
  properties: {
    unit: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1
    }
  },
  required: ["unit"],
  additionalProperties: false
}

// 'category':'素菜类',//所属分类
// 'image':'htpp',//商品图片
// 'name':'土豆丝',//商品名称
// 'unitprice':20,//商品单价
// 'unit':'份',//商品单位
// 'quantity':3，//商品数量
//上架菜品
const schema_dishPutaway = {
  type: "object",
  minProperties: 6,
  maxProperties: 6,
  properties: {
    category: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
      errorMessage: CATEGORY_MUST_BE_STRING,
    },
    image: {
      type:"string",
      // type: "array",
      // items: [{
      //   type: "object",
      //   minProperties: 2,
      //   maxProperties: 2,
      //   properties: {
      //     uid: {
      //       type: "string",
      //       pattern: "^\\S*$",
      //       minLength: 1
      //     },
      //     url: {
      //       type: "string",
      //     }
      //   },
      //   errorMessage: OBJECT_VALUE_IS_INVALID,
      //   required: ["uid","url"],
      //   additionalProperties: false
      // }],
      // minItems: 1,
      // maxItems: 1,
      errorMessage: IMAGE_FORMAT_ERROR,
      //不允许额外添加元素
      additionalItems: false
    },
    name: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
      errorMessage: DISHNAME_TYPE_ERROR
    },
    unitprice: {
      type: "number",
      minimum: 0,
      errorMessage: DISHUNITPRICE_TYPE_ERROR
    },
    unit: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
      errorMessage: DISHUNIT_TYPE_ERROR
    },
    value: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
      errorMessage: DISHCID_TYPE_ERROR
    }
  },
  required: ["category","image","name","unitprice","unit","value"],
  additionalProperties: false
}


//下架菜品参数
const schema_pullDishes = {
  type: "object",
  minProperties: 2,
  maxProperties: 2,
  properties:{
    id: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
    },
    value: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
    }
  },
  required: ["id","value"],
  additionalProperties: false
}

//菜品新增验证
const schema_dishEdit = {
  type: "object",
  minProperties: 7,
  maxProperties: 7,
  properties: {
    id: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
    },
    category: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
      errorMessage: CATEGORY_MUST_BE_STRING,
    },
    image: {
      type: "array",
      items: [{
        type: "object",
        minProperties: 2,
        maxProperties: 2,
        properties: {
          uid: {
            type: "string",
            pattern: "^\\S*$",
            minLength: 1
          },
          url: {
            type: "string",
          }
        },
        errorMessage: OBJECT_VALUE_IS_INVALID,
        required: ["uid","url"],
        additionalProperties: false
      }],
      minItems: 1,
      maxItems: 1,
      errorMessage: IMAGE_FORMAT_ERROR,
      //不允许额外添加元素
      additionalItems: false
    },
    name: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
      errorMessage: DISHNAME_TYPE_ERROR
    },
    unitprice: {
      type: "number",
      minimum: 0,
      errorMessage: DISHUNITPRICE_TYPE_ERROR
    },
    unit: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
      errorMessage: DISHUNIT_TYPE_ERROR
    },
    value: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
      errorMessage: DISHCID_TYPE_ERROR
    }
  },
  required: ["id","category","image","name","unitprice","unit","value"],
  additionalProperties: false
}

//添加桌号参数
const schema_qrCodeAdd = {
  type: "object",
  minProperties: 1,
  maxProperties: 1,
  properties: {
    table: {
      type: "string",
    }
  },
  required: ["table"],
  additionalProperties: false
}

//获取订单传递参数
const schema_orderQuery = {
  type: "object",
  minProperties: 1,
  maxProperties: 2,
  properties: {
    page: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1,
    },
    //订单状态
    transac_status: {
      type: "string",
      pattern: "^\\S*$",
    },
  },
  required: ["page"],
  additionalProperties: false
}

//查看菜单
const schema_viewOrder = {
  type: "object",
  minProperties: 1,
  maxProperties: 1,
  properties: {
    id: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1
    }
  },
  required: ["id"],
  additionalProperties: false
}

//结账
const schema_Checkout = {
  type: "object",
  minProperties: 4,
  maxProperties: 4,
  properties: {
    id: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1
    },
    openid: {
      type: "string",
      pattern: "^\\S*$",
      minLength: 1
    },
    //价格
    sett_amount: {
      type: "string",
      pattern: "^\\S*$",
    },
    order_no: {
      type: "string",
      pattern: "^\\S*$",
    }
  },
  required: ["id","openid","sett_amount","order_no"],
  additionalProperties: false
}

module.exports = {
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
};
