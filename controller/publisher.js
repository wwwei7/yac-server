var Dao = require('../dao/ssp/publisher');
var UserDao = require('../dao/user')
var _ = require('lodash')
var Moment = require('moment');
var CryptoUtil = require('.././util/crypto');
var filterName=function(data){
  var newData = { name: null}
  if(data && data.name){
    newData.name = data.name
  }
  return newData
}

var handler = {
  findById: function(req, res, next){
    var id = req.params.id;
    Dao.findById(id, function(data){
      
      next(data);
    })
  },

  findList: function(req, res, next){
    var sspID = req.params.uid;
    Dao.findList(sspID, function(data){
      next(data)
    })
  },

  findInLoginName: function(req, res, next){
    var username = req.params.username;
    UserDao.nameExist(username, function(data){
      if(data){
        next({name: data.name})
      }else{
        next()
      }
    })
  },

  findInName: function(req, res, next){
    var pid = req.params.pid; 
    var name = req.params.name;
    Dao.findNameByPublisher(pid, name, function(data){
      next(data)
    })
  },

  
  insert: function(req, res, next){
    var data = req.body;

    //password对称解密
    data.password = CryptoUtil.decodeAES(data.password);
    //password哈希加密
    data.password = CryptoUtil.sha256(data.password);
    
    Dao.insert(data, next)
  },

  update: function(req, res, next){
    var data = req.body;
    Dao.update(data, next)
  },

  findAccount: function(req, res, next){
    var reqData = req.query;
    if(!reqData.id){
      next({name: null}) 
      return
    }
    UserDao.findAccount(reqData, function(data){
      next(filterName(data))
    })
  },

  updateAccount: function(req, res, next){
    var reqData = req.body;
    if(!reqData.id){
      next({
        success: false,
        msg: 'Missing parameter id'
      })
      return
    }
    if(!reqData.psw){
      next({
        success: false,
        msg: 'Missing parameter psw'
      })
      return
    }
    if(!reqData.oldpsw){
      next({
        success: false,
        msg: 'Missing parameter oldpsw'
      })
      return
    }
    UserDao.updateAccount(reqData, function(data){
      next((data))
    })

  }

}

module.exports = handler;