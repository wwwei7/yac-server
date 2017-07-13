var Dao = require('../dao/ssp/adspace');
var Moment = require('moment');


var handler = {

  findInName: function(req, res, next){
    var pid = req.params.pid,
        name = req.params.name;
    Dao.findNameByPublisher(pid, name, next);
  },
  
  
  insert: function(req, res, next){
    var data = req.body;

    Dao.insert(data, next)
  },

  getList: function(req, res, next){
    var publisherID = req.params.publisherID;

    Dao.getList(publisherID, function(data){
      next(data)
    })
  },

  update: function(req, res, next){
    var id = req.params.id,
        data = req.body;

    data.id = id;
    
    Dao.update(translate(data), next)
  },

  pause: function(req, res, next){
    var values = {
      disabled: req.body.status
    }
    Dao.pause(values, req.params.id,next)
  }
}

module.exports = handler;