
var Dao = require('../../dao/ssp/user');
var CryptoUtil = require('../../util/crypto');

var handler = {

  register: function(req, res, next){
    var data = req.body;

    if(data.pin != '1c23e95c1e6dc25c6d73b0de9b9783298da30816f1d8f2f4eedf348a6b7d0818')
      return next({
        success: false,
        err: 'PIN码错误'
      })

    //先AES解密获取原始密码
    var oriPassword = CryptoUtil.decodeAES(data.psw);
    //哈希加密
    data.psw = CryptoUtil.sha256(oriPassword)
    data.role = 'ssp';
    Dao.register(data, function(data){
      next({
        success: data
      });
    })
  },

  pswReset: function(req, res, next){
    var data = req.body;

    if(data.pin != '1c23e95c1e6dc25c6d73b0de9b9783298da30816f1d8f2f4eedf348a6b7d0818')
      return next({
        success: false,
        err: 'PIN码错误'
      })

    //先AES解密获取原始密码
    var oriPassword = CryptoUtil.decodeAES(data.psw);
    //哈希加密
    data.psw = CryptoUtil.sha256(oriPassword)
    
    Dao.update({
      psw: data.psw
    }, {
      name: data.name
    }, function(data, err){
      next({success: data, err: err})
    })
  },

  oldPswCheck: function(req, res, next){
    var name = req.body.name;
    var password = req.body.password;

    //password对称解密
    password = CryptoUtil.decodeAES(password);
    //password哈希加密
    password = CryptoUtil.sha256(password);
    var callback = function(user){
        if(user){ 
          next({name: user.name})
        }else{
          next({name: null})    
        }
    };

    Dao.find(name,password,callback);
  },
  publisherPsw:function(req, res, next){
    var data = req.body;

    //password对称解密
    data.psw = CryptoUtil.decodeAES(data.psw);
    data.oldpsw = CryptoUtil.decodeAES(data.oldpsw);
    //password哈希加密
    data.psw = CryptoUtil.sha256(data.psw);
    data.oldpsw = CryptoUtil.sha256(data.oldpsw);

    Dao.update({
      psw: data.psw
    }, {
      publisherid: data.id,
      psw: data.oldpsw
    }, function(data, err){
      next({success: data, err: err})
    })

  }
}

module.exports = handler;