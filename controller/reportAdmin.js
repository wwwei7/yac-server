var Dao = require('../dao/reportAdmin');
var Moment = require('moment');
var _ = require('lodash')
var co = require('co')
require('moment-range');

var dealHourData = function(data){
  var show = [], click = [], money = [], cpc = [], cpm = [], ctr = [],
      dayItem = {} , moneyItem = 0 ,i = 0;
  for(;i<24;i++){
    dayItem = data[i];
    //当前小时吻合
    if(dayItem && dayItem.hour == i){
      show.push(dayItem.show);
      click.push(dayItem.click);
      moneyItem = parseFloat(parseFloat((dayItem.money || 0) + (dayItem.service || 0) + (dayItem.profit || 0)).toFixed(2));
      money.push(moneyItem);
      cpc.push(dayItem.click ? parseFloat((moneyItem/dayItem.click).toFixed(2)) : 0);
      cpm.push(dayItem.show ? parseFloat((moneyItem*1000/dayItem.show).toFixed(2)) : 0)
      ctr.push(dayItem.click && dayItem.show ? parseFloat((dayItem.click/dayItem.show).toFixed(3)) : 0 )
    }else{
      //当前小时数不吻合，留空
      show.push(0);
      click.push(0);
      money.push(0);
      cpc.push(0)
      cpm.push(0)
      ctr.push(0)
    }
  }
  return {
    show, click, money, cpc, cpm, ctr
  }
}


var dealDaysData = function(data, start, end, userRole){
      if(data.error || !data){
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
  },


  getMain: function (req, res, next){
    co(function* (){
      var today = req.params.day;
      var yesterday = Moment(today).subtract(1, 'days').format('YYYY-MM-DD');
      var lastweek = Moment(today).subtract(7, 'days').format('YYYY-MM-DD');
      
      //以小时分隔
      var todayData = yield new Promise(function(resolve, reject){
        Dao.findYaxByHour(today, function(data){
          resolve(data)
        })
      })
      var yesterdayData = yield new Promise(function(resolve, reject){
        Dao.findYaxByHour(yesterday, function(data){
          resolve(data)
        })
      })
      var lastweekData = yield new Promise(function(resolve, reject){
        Dao.findYaxByHour(lastweek, function(data){
          resolve(data)
        })
      })
      next({
        today: dealHourData(todayData),
        yesterday: dealHourData(yesterdayData),
        lastweek: dealHourData(lastweekData),
        lastweekDay: lastweek
      })
    }).catch(function(err){
      next({
        err: 1,
        errMsg: 'search failed'
      })
    })
  }

}

module.exports = handler;