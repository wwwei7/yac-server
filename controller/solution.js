var Dao = require('../dao/solution');
var Moment = require('moment');

var translate = function(data){
  var obj = {};
  Object.keys(data).map(function(key,index){
    var value = data[key];
    switch(key){
      case 'start_date':
        obj[key] = value + ' 00:00:00';
        break;
      case 'end_date':
        value = value || '2030-12-31';
        obj[key] = value + ' 23:59:59';
        break;
      case 'region_value':
        if(data['region_type']==2)
          obj[key] = value.join ? value.join(',') : value;
        else
          obj[key] = value;
        break;
      case 'hour_rangexxx':
        if(data['hourFull'])
          obj[key] = '16777215_16777215_16777215_16777215_16777215_16777215_16777215';
        else{
          var arr = value.split('_'), item, temp=[];
          for(item of arr){
            temp.push(parseInt(item,2))
          }
          obj[key] = temp.join('_')
        }

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
      var hourRange = data.hour_range,
          hours;

      if(data.end_date.isAfter('2030-12-30')){
        data.end_date = '';
      }else{
        data.end_date = data.end_date.format('YYYY-MM-DD');
      }

      // 
      if(hourRange == "16777215_16777215_16777215_16777215_16777215_16777215_16777215"){
        data.hourFull = true;
      }else{
        hours = hourRange.split('_');
        var temp = [];
        for(let hour of hours){
          let binStr = parseInt(hour).toString(2);
          let len = binStr.length;
          if(len<24){
            binStr = new Array(24-len+1).join('0') + binStr;
          }
          temp.push(binStr)
        }
        data.hour_range = temp.join('_');
        data.hourFull = false;
      }

      next(data);
    })
  },

  findListByType: function(req, res, next){
    var aid = req.params.aid;
    var resObj = {
      pc: [],
      mobile: [],
      ott: []
    }
    Dao.findByAid(aid, function(data){
      console.log(data)
      data.map(item => {
        switch(item.solution_type){
          case 1:
            resObj.pc.push(item)
            break;
          case 2:
            resObj.mobile.push(item)
            break;
          case 3:
            resObj.ott.push(item)          
            break;
        }
      })
      next(resObj)
    })
  },
  
  insert: function(req, res, next){
    var data = req.body;

    Dao.insert(data, next)
  },

  listWithCost: function(req, res, next){
    var aid = req.params.aid;

    Dao.findListWithCost(aid, function(data){
      data.map(item => {
        return item.cost = item.money + item.service || 0
      })
      next(data)
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