
var Dao = require('../../dao/yax/user');
var CryptoUtil = require('../../util/crypto')

var handler = {
  findNameExist: function(req, res, next){
    var name = req.params.username;
    Dao.nameExist(name, function(data){
      next(data)
    })
  },

  register: function(req, res, next){
    var data = req.body;

    if(data.pin != 'be1b8f6b844547b7141b585195ba3d6e0a349603abcb2d01961392b92c206d7f')
      return next({
        success: false,
        err: 'PIN码错误'
      })

    //先AES解密获取原始密码
    var oriPassword = CryptoUtil.decodeAES(data.psw);
    //哈希加密
    data.psw = CryptoUtil.sha256(oriPassword)
    Dao.register(data, function(data){
      next({
        success: data
      });
    })
  },

  pswReset: function(req, res, next){
    var data = req.body;

    if(data.pin != 'be1b8f6b844547b7141b585195ba3d6e0a349603abcb2d01961392b92c206d7f')
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
  }
}

module.exports = handler;