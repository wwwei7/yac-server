
var Dao = require('../../dao/yax/report');
var Moment = require('moment');
var co = require('co')
require('moment-range');


var dealDaysData = function(data, start, end){
    if(data.error){
      return next(data);
    }

    // 获取区间所有日期
    var rangeDays = Moment.range(Moment(start, "YYYY-MM-DD"), Moment(end, "YYYY-MM-DD")).toArray('days');

    var day_key = '',
        all_show = 0,
        all_click = 0,
        all_money = 0,        
        resObj = {
          days: {},
          all: {}
        };

    for(var i=0;i<rangeDays.length;i++){
      day_key = Moment(rangeDays[i]).format('YYYY-MM-DD');
      resObj.days[day_key] = {
        show: 0,
        click: 0,
        money: 0
      };
    }

    data.forEach(function(item){
      var day = Moment(item.date).format('YYYY-MM-DD');
      var day_data = resObj.days[day];
      day_data.show = item.shows;
      day_data.click = item.click;
      day_data.money = parseFloat((item.money + item.service).toFixed(2));

      all_show += day_data.show;
      all_click += day_data.click; 
      all_money += day_data.money; 
      
    });

    resObj.all.all_show = all_show;
    resObj.all.all_click = all_click;
    resObj.all.all_money = all_money.toFixed(2);
    resObj.all.cpr = ((all_click/all_show)*100).toFixed(2); //点击率
    resObj.all.cpc = (all_money/all_click).toFixed(2) //平均点击花费
    resObj.all.cpm = ((all_money/all_show)*1000*100).toFixed(2) //千次展示花费

    return resObj;
}

var dealDownloadHourData = function(data, userRole){
  var showService = userRole == 'agency';
  for(var item of data){
    if(!showService){
      item.money = parseFloat((item.money + item.service).toFixed(2));
      delete item.service;
    }else{
      item.money = parseFloat(item.money.toFixed(2));
      item.service = parseFloat(item.service.toFixed(2));
    }
  }
  return data;
}

var dealDownloadDaysData = function(data, userRole){
  var showService = userRole == 'agency';
  for(var item of data){
    item.date = Moment(item.date).format('YYYY-MM-DD');
    if(!showService){
      item.money = parseFloat((item.money + item.service).toFixed(2));
      delete item.service;
    }else{
      item.money = parseFloat(item.money.toFixed(2));
      item.service = parseFloat(item.service.toFixed(2));
    }
  }  
  return data;  
}

//获取概览参数，查询全部花费、上月花费、本月花费、当日花费
exports.findSummary = function(req, res, next){
  const dspid = req.params.dspid;
  
  Dao.findSummary(dspid, function(data){
    next({
      lastAll: parseFloat((data.lastAll.money || 0).toFixed(2)),
      lastMonth: parseFloat((data.lastMonth.money || 0).toFixed(2)),
      nowMonth: parseFloat((data.nowMonth.money || 0).toFixed(2)),
      nowDay: parseFloat((data.nowDay.money || 0).toFixed(2))
    });
  });
}


exports.findByDay = function(req, res, next){
    const dspid = req.params.dspid,
          days = req.params.days.split('t');
    const start = days[0],
          end = days[1];
    
    // if(!req.session.user){
    //   return next({err: 'need login'})
    // } 
    
    Dao.findByDay(69, start, end, function(data){
      next(dealDaysData(data, start, end));
    });
  }