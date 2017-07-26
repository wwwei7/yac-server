var Dao = require('../dao/antiCheat');
var moment = require('moment');

var dataCheat = function(data, next){
  if(!data.aid){
    return next({
      err: 'aid null'
    })
  }
  return {
    advertiser_id: data.aid,
    smart: data.smart || 0
  }
}
var handler = {
  insert: function(req, res, next){
    var data = dataCheat(req.body);
    Dao.insert(data, next);
  },

  getByAid: function(req, res, next){
    var aid = req.params.aid;
    Dao.getByAid(aid, next);
  }
}

module.exports = handler;