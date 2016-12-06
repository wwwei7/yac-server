var Dao = require('../dao/charge');
var moment = require('moment');
var handler = {
  insert: function(req, res, next){
    var data = req.body;
    data.opt_time = moment().format('YYYY-MM-DD HH:mm:ss');
    Dao.insert(data, next);
  },
  findByAid: function(req, res, next){
    var aid = req.params.aid;
    Dao.findByAid(aid, next);
  }
}

module.exports = handler;