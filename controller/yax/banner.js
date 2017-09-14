var Dao = require('../../dao/yax/banner');
var handler = {

  findByDspid: function(req, res, next){
    let data = req.query;
    if(!data.dspid){
     return next([]);
    }
    Dao.findList(data, next);
  },
  findList: function(req, res, next){
    var data = req.query;
    Dao.findList(data, next);
  },
  upStatus: function(req, res, next){
    var data = req.body;
    Dao.upStatus(data, next);
  },
}

module.exports = handler;