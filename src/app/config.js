require("dotenv").config();
const fs = require("fs");
const path = require("path");

const PRIVATEKEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
const PUBLICKEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));

module.exports = {
  BASE_URL,
  TIME_OUT,
  ACCESS_TOKEN_URL,
  GRANT_TYPE,
  APPID,
  SECRET,
  PORT,
  ACCESS_TOKEN,
  ENV_ID,
  ACCESS_KEY,
  ACCESS_KEY_SECRET,
  ORCODE_URL,
  REQUEST_URL,
  SEND_MESSAGE_URL,
  TEMPLATE_ID,
  MINIPROGRAM_STATE
} = process.env;

module.exports.PRIVATEKEY = PRIVATEKEY;
module.exports.PUBLICKEY = PUBLICKEY;
