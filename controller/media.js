var Dao = require('../dao/ssp/media');
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

  findInName: function(req, res, next){
    var uid = req.params.uid; 
    var name = req.params.name;
    Dao.findInName(uid, name, function(data){
      next(data)
    })
  },

  
  insert: function(req, res, next){
    var data = req.body;

    Dao.insert(data, next)
  },

  update: function(req, res, next){
    var id = req.params.id,
        data = req.body;

    data.id = id;
    
    Dao.update(translate(data), next)
  }
}

module.exports = handler;