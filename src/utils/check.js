const { isNumber, isArray } = require("./utils");

//检查工具类
class CheckUtils {
  constructor(ctx, ...args) {
    this.ctx = ctx;
    this.args = args;
  }

  //验证数据是否包含空格
  verityBlank(errMsgList = []) {
    let blankIndex = this.args.findIndex(
      (item) => !isArray(item) && item.split(" ").join("").length === 0
    );
    console.log("blackIndex=", blankIndex);
    if (blankIndex !== -1) {
      this.ctx.app.emit("error", new Error(errMsgList[blankIndex]), this.ctx);
      return true;
    }
  }

  //验证数据空字符串、null、undefined
  verityNullStringUndefined(errMsgList = []) {
    let nullStringIndex = this.args.findIndex((item) => {
      if (!isNumber(item)) return !item;
    });
    if (nullStringIndex !== -1) {
      this.ctx.app.emit(
        "error",
        new Error(errMsgList[nullStringIndex]),
        this.ctx
      );
      return true;
    }
  }
}

module.exports = {
  CheckUtils,
};
