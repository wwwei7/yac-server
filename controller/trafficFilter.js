var Dao = require('../dao/trafficFilter');
var moment = require('moment');
var handler = {
  insert: function(req, res, next){
    var data = req.body;
    if(!data.advertiser_id){
      return next({
        err: 'aid null'
      })
    }
    Dao.insert(data, next);
  },
  getByAid: function(req, res, next){
    var aid = req.params.aid;
    Dao.getByAid(aid, next);
  },
  update: function(req, res, next){
    var data = req.body;
    var aid = data.advertiser_id;    
    if(!aid){
      return next({
        err: 'aid null'
      })
    }
    delete data.advertiser_id;
    Dao.update(aid, data, next)
  }

}

module.exports = handler;