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
      moneyArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    };

    Dao.findByHour(aid, day, function(data){
      
      data.forEach(function(item){
        resObj.showArr[item.hour] = item.shows;
        resObj.clickArr[item.hour] = item.click;
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
          money: 0,
          service: 0       
        };
      }

      data.forEach(function(item){
        var day = Moment(item.date).format('YYYY-MM-DD');
        var day_data = resObj[day];
        day_data.show = item.shows;
        day_data.click = item.click;
        day_data.money = item.money;
        day_data.service = item.service;
      });
      
      next(resObj);
    });
  },


  findMedia: function(req, res, next){
    var aid = req.params.aid;
    var days = req.params.days.split('t');
    var start = days[0],
        end = days[1];
    var resObj = {
      media: [],
      show: [],
      click: [],
      money: []
    }
    
    Dao.findMedia(aid, start, end, function(data){

      if(data.error){
        return next(data);
      }
      for(var item of data){
        resObj.media.push(item.media);
        resObj.show.push(item.shows);
        resObj.click.push(item.click);
        resObj.money.push(item.money.toFixed(2))
      }
      next(resObj)
    });
  }

}

module.exports = handler;