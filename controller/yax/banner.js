var Dao = require('../../dao/yax/banner');
var handler = {
  findList: function(req, res, next){
    Dao.findList(next);
  },
  findBybid: function(req, res, next){
    var bid = req.params.bid;
    Dao.findBybid(bid, next);
  },
  findByaid: function(req, res, next){
    var aid = req.params.aid;
    Dao.findByaid(aid, next);
  },
  upStatus: function(req, res, next){
    var data = req.body;
    Dao.upStatus(data, next);
  }
}

module.exports = handler;