var Dao = require('../dao/report');
var Moment = require('moment');
require('moment-range');

var handler = {

  findByHour: function(req, res, next){
    var aid = req.params.aid,
        day = req.params.day;

    var resObj = {
      showArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      clickArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      moneyArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    };

    Dao.findByHour(aid, day, function(data){
      
      data.forEach(function(item){
        resObj.showArr[item.hour] = item.show_all;
        resObj.clickArr[item.hour] = item.click_all;
        resObj.moneyArr[item.hour] = item.money;
      }) 
      next(resObj);
    });
  },

  findByDays: function(req, res, next){
    var aid = req.params.aid;
    var days = req.params.days.split('t');
    var start = days[0],
        end = days[1];
    
    Dao.findByDay(aid, start, end, function(data){

      if(data.error){
        return next(data);
      }

      // 获取区间所有日期
      var rangeDays = Moment.range(Moment(start, "YYYY-MM-DD"), Moment(end, "YYYY-MM-DD")).toArray('days');

      var day_key = '',
          resObj = {};
      for(var i=0;i<rangeDays.length;i++){
        day_key = Moment(rangeDays[i]).format('YYYY-MM-DD');
        resObj[day_key] = {
          show: 0,
          click: 0,
          money: 0
        };
      }

      data.forEach(function(item){
        var day = Moment(item.day).format('YYYY-MM-DD');
        var day_data = resObj[day];
        day_data.show = item.show_all;
        day_data.click = item.click_all;
        day_data.money = item.money_all;
      })
      
      next(resObj);
    });
  }

}

module.exports = handler;