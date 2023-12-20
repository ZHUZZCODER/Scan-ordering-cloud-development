//对返回消息进行封装
class Result {
  constructor(ctx, msg = "SUCCESS", status = 200, data = null, extra = null) {
    this.ctx = ctx;
    this.msg = msg;
    this.status = status;
    this.data = data;
    this.extra = extra;
  }

  getResult() {
    this.ctx.body = {
      msg: this.msg,
      data: this.data,
      extra: this.extra,
    };
    this.ctx.status = this.status;
  }
}

module.exports = Result;
