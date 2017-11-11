var Dao = require('../dao/reportAdmin');
var Moment = require('moment');
var _ = require('lodash')
require('moment-range');


var dealDaysData = function(data, start, end, userRole){
      if(data.error){
        return next(data);
      }

      // 获取区间所有日期
      var rangeDays = Moment.range(Moment(start, "YYYY-MM-DD"), Moment(end, "YYYY-MM-DD")).toArray('days');

      var day_key = '',
          resObj = {};


      data.map(function(item){
        for(key in item){
          let value = item[key]
          if(_.isNumber(value))
            item[key] = parseFloat(value.toFixed(2));
        }
        // item.money = parseFloat(item.money.toFixed(2));
        // item.service = parseFloat(item.service.toFixed(2));
        item.date = Moment(item.date).format('YYYY-MM-DD');
        // item.adtype = item.adtype ? item.adtype.split(',') : []
        return item
      })
      return data
}



var handler = {

  getSSP: function(req, res, next){
    var days = req.params.days.split('t');
    var start = days[0],
        end = days[1];
    var userRole = req.session.user ? req.session.user.role : null;
    
    // if(!userRole){
    //   return next({err: 'login'})
    // }
    
    Dao.findBySSP(start, end, function(data){
      next(dealDaysData(data, start, end));
    });
  },

  getBid: function(req, res, next){
    var days = req.params.days.split('t');
    var start = days[0],
        end = days[1];
    var userRole = req.session.user ? req.session.user.role : null;
    
    // if(!userRole){
    //   return next({err: 'login'})
    // }
    
    Dao.findByBid(start, end, function(data){
      next(dealDaysData(data, start, end));
    });
  }

}

module.exports = handler;