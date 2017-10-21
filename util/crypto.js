var Crypto = require('crypto-js')
var cryptoSHA256 = require('crypto-js/sha256')

//aes解密
exports.decodeAES = function(text, secret){
  secret = secret || 'yax$207_';
  var bytes = Crypto.AES.decrypt(text, secret)
  return bytes.toString(Crypto.enc.Utf8)
}

//sha256加密
exports.sha256 = function(text, salt){
  salt = salt || 'p skk 32_';
  var hex = cryptoSHA256(text + salt)
  return hex.toString(Crypto.enc.Hex)
}