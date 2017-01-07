var Dao = require('../dao/solution');
var Moment = require('moment');

var translate = function(data){
  var obj = {};
  Object.keys(data).map(function(key,index){
    var value = data[key];
    switch(key){
      case 'end_date':
        obj['end_date'] = obj['end_date'] || '2030-12-31';
        break;
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
  findById: function(req, res, next){
    var id = req.params.id;
    Dao.findById(id, function(data){
      data.start_date = Moment(data.start_date).format('YYYY-MM-DD');
      data.end_date = Moment(data.end_date);

      if(data.end_date.isAfter('2030-12-30')){
        data.end_date = '';
      }else{
        data.end_date = data.end_date.format('YYYY-MM-DD');
      }

      next(data);
    })
  },
  update: function(req, res, next){
    var id = req.params.id,
        data = req.body;

    data.id = id;
    
    Dao.update(translate(data), next)
  },
  pause: function(req, res, next){
    var values = {
      disabled: req.body.status
    }
    Dao.pause(values, req.params.id,next)
  }
}

module.exports = handler;