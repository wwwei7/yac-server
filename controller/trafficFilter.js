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
  }
}

module.exports = handler;