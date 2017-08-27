var Dao = require('../dao/ssp/publisher');
var UserDao = require('../dao/user')
var _ = require('lodash')
var Moment = require('moment');


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
      next(data)
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
    Dao.insert(data, next)
  },

  update: function(req, res, next){
    var data = req.body;
    Dao.update(data, next)
  }
}

module.exports = handler;