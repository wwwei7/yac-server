var crypto = require('crypto');

var toHmac = function(str){

  var secrectKey='miyue';//加密的密钥；
  var buf = crypto.randomBytes(16);
  secrectKey = buf.toString('hex');//密钥加密；
  var signture = crypto.createHmac('sha1', secrectKey);//定义加密方式
  signture.update(str);
  return signture.digest().toString('base64');//生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
}

module.exports = toHmac;