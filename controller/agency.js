var Dao = require('../dao/agency');

var handler = {
  getList: function(req, res, next){
    Dao.getList(next);
  },
  get: function(req, res, next){
    var agid = req.params.agid;
    Dao.get({id: agid}, next);
  }
}

module.exports = handler;