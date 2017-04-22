var Dao = require('../dao/trafficFilter');
var moment = require('moment');

var dataFilter = function(data, next){
  if(!data.aid){
    return next({
      err: 'aid null'
    })
  }
  return {
    advertiser_id: data.aid,
    media: data.media || '',
    location: data.location || '',
    ip: data.ip || ''
  }
}
var handler = {
  insert: function(req, res, next){
    var data = dataFilter(req.body);
    Dao.insert(data, next);
  },

  getByAid: function(req, res, next){
    var aid = req.params.aid;
    Dao.getByAid(aid, next);
  },

  update: function(req, res, next){
    var data = dataFilter(req.body);

    delete data.advertiser_id;
    Dao.update(aid, data, next)
  }
}

module.exports = handler;