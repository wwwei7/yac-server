var Dao = require('../dao/ssp/adspace');
var Moment = require('moment');


var handler = {

  get: function(req, res, next){
    const adsid = req.params.adsid;
    Dao.findById(adsid, next);
  },

  findInName: function(req, res, next){
    var pid = req.params.pid,
        name = req.params.name;
    Dao.findNameByPublisher(pid, name, next);
  },
  
  
  insert: function(req, res, next){
    var data = req.body;

    //暂无待审核状态，默认有效
    data.status = 1;

    Dao.insert(data, next)
  },

  getList: function(req, res, next){
    var publisherID = req.params.publisherID;

    Dao.getList(publisherID, function(data){
      next(data)
    })
  },

  update: function(req, res, next){
    var id = req.params.adsid,
        data = req.body;
    
    Dao.update(id, data, next)
  },

  pause: function(req, res, next){
    var values = {
      disabled: req.body.status
    }
    Dao.pause(values, req.params.id,next)
  }
}

module.exports = handler;