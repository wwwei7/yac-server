var Dao = require('../dao/banner');

var handler = {
  insert: function(req, res, next){
    var data = req.body;
    Dao.insert(data, next);
  },
  findByAid: function(req, res, next){
    var aid = req.params.aid;
    Dao.findByAid(aid, next);
  }
}

module.exports = handler;