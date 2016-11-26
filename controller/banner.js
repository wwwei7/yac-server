var Dao = require('../dao/banner');

var handler = {
  insert: function(req, res, next){
    var data = req.body;
    Dao.insert(data, next);
  }
}

module.exports = handler;