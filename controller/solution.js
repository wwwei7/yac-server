var Dao = require('../dao/solution');

var translate = function(data){
  var obj = {};
  Object.keys(data).map(function(key,index){
    var value = data[key];
    switch(key){
      case 'region':
        obj['region_type'] = value.type;
        obj['region_value'] = value.value.join ? value.value.join(',') : value.value;
        break;
      default:
        obj[key] = value;
    }
  })

  return obj;
}

var handler = {
  update : function(req, res, next){
    var id = req.params.id,
        data = req.body;

    data.id = id;
    
    Dao.update(translate(data), next)
  },
  pause : function(req, res, next){
    var values = {
      disabled: req.body.status
    }
    Dao.pause(values, req.params.id,next)
  }
}

module.exports = handler;