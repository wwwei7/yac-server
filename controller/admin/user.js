
var sspDao = require('../../dao/ssp/user');
var CryptoUtil = require('../../util/crypto');
var yaxDao = require('../../dao/yax/user');
var handler = {

  register: function(req, res, next){
    var data = req.body;
    //先AES解密获取原始密码
    var oriPassword = CryptoUtil.decodeAES(data.psw);
    //哈希加密
    data.psw = CryptoUtil.sha256(oriPassword)
    if(data.role==1){
      data.role='agency';
      sspDao.register(data, function(data){
        next({
          success: data
        });
      })
    }else if(data.role==2){
      data.role='ssp';
      sspDao.register(data, function(data){
        next({
          success: data
        });
      })
    }else if(data.role==3){
      data.role = null;
      yaxDao.register(data, function(data){
        next({
          success: data
        });
      })
    }else{
      next({
        success: false
      });
    }
    
  },

  pswReset: function(req, res, next){
    var data = req.body;

    //先AES解密获取原始密码
    var oriPassword = CryptoUtil.decodeAES(data.psw);
    //哈希加密
    data.psw = CryptoUtil.sha256(oriPassword)
    var Dao = data.role==3 ? yaxDao : sspDao;
    Dao.update({
      psw: data.psw
    }, {
      name: data.name
    }, function(data, err){
      next({success: data, err: err})
    })
  },

}

module.exports = handler;