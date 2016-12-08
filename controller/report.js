var Dao = require('../dao/report');


var handler = {

  findByHour: function(req, res, next){
    var aid = req.params.aid,
        day = req.params.day;
    Dao.findByHour(aid, day, next);
  }
}

module.exports = handler;