
var Dao = require('../../dao/yax/injectSetting');


var handler = {
  findById: function(req, res, next){
    var id = req.params.id;
    Dao.findById(id, function(data){
      
      next(data);
    })
  },

  update: function(req, res, next){
    var data = req.body;
    Dao.update(data, function(data){
      next(data)
    })
  }
}

module.exports = handler;