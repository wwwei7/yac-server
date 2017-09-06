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
  },
  findByDspid: function(req, res, next){
    var dspid = req.params.dspid;
    Dao.findByDspid(dspid, next);
  },
  findByDspidForaid: function(req, res, next){
    var dspid = req.params.dspid;
    var aid = req.params.aid;
    Dao.findByDspidForaid(dspid, aid, next);
  },
  findByDspidForbid: function(req, res, next){
    var dspid = req.params.dspid;
    var bid = req.params.bid;
    Dao.findByDspidForbid(dspid, bid, next);
  }
}

module.exports = handler;