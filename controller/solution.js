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
      case 'start_date':
      case 'end_date':
        obj[key] = value.split('T')[0];
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
  }
}

module.exports = handler;