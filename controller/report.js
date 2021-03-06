var Dao = require('../dao/report');
var sspDao = require('../dao/ssp/report');
var Moment = require('moment');
require('moment-range');

var dealHourData = function(data, userRole){
    var resObj = {
      showArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      clickArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      moneyArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      serviceArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],      
    };
    switch(userRole){
      case 'agency':
      case 'ssp':
        data.forEach(function(item){
          resObj.showArr[item.hour] = item.shows;
          resObj.clickArr[item.hour] = item.click;
          resObj.moneyArr[item.hour] = parseFloat(item.money.toFixed(2));
          resObj.serviceArr[item.hour] = parseFloat(item.service.toFixed(2));          
        });
        break;
      case 'advertiser':
      case 'publisher':
        data.forEach(function(item){
          resObj.showArr[item.hour] = item.shows;
          resObj.clickArr[item.hour] = item.click;
          resObj.moneyArr[item.hour] = parseFloat((item.money + item.service).toFixed(2));
        });
        break;
    }
    return resObj;
}

var dealDaysData = function(data, start, end, userRole){
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
      
      switch(userRole){
        case 'agency':
          data.forEach(function(item){
            var day = Moment(item.date).format('YYYY-MM-DD');
            var day_data = resObj[day];
            day_data.show = item.shows;
            day_data.click = item.click;
            day_data.money = parseFloat(item.money.toFixed(2));
            day_data.service = parseFloat(item.service.toFixed(2));
            day_data.sid = item.sid;
            day_data.sname = item.sname;
          });
          break;
        case 'ssp':
          data.forEach(function(item){
            var day = Moment(item.date).format('YYYY-MM-DD');
            var day_data = resObj[day];
            day_data.show = item.shows;
            day_data.click = item.click;
            day_data.money = parseFloat(item.money.toFixed(2));
            day_data.service = parseFloat(item.service.toFixed(2));
            day_data.adspaceid = item.adspaceid;
          });
          break;
        case 'advertiser':
          data.forEach(function(item){
            var day = Moment(item.date).format('YYYY-MM-DD');
            var day_data = resObj[day];
            day_data.show = item.shows;
            day_data.click = item.click;
            day_data.money = parseFloat((item.money + item.service).toFixed(2));
            day_data.sid = item.sid;
            day_data.sname = item.sname;            
          });
          break;
        case 'publisher':
          data.forEach(function(item){
            var day = Moment(item.date).format('YYYY-MM-DD');
            var day_data = resObj[day];
            day_data.show = item.shows;
            day_data.click = item.click;
            day_data.money = parseFloat((item.money + item.service).toFixed(2));
            day_data.adspaceid = item.adspaceid;
          });
          break;
      }

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


var handler = {

  findByHour: function(req, res, next){
    var aid = req.params.aid,
        sid = req.params.sid,    
        day = req.params.day;
    var userRole = req.session.user ? req.session.user.role : null;

    if(!userRole){
      return next({err: 'login'})
    }

    Dao.findByHour(aid, sid, day, function(data){   
      next(dealHourData(data, userRole));
    });
  },

  downloadByHour: function(req, res, next){
    var aid = req.params.aid,
        sid = req.params.sid,    
        day = req.params.day;
    var userRole = req.session.user ? req.session.user.role : null;

    if(!userRole){
      return next({err: 'login'})
    }

    Dao.downloadByHour(aid, sid, day, function(data){   
      next(dealDownloadHourData(data, userRole));
    });
  },

  findByDays: function(req, res, next){
    var aid = req.params.aid,
        sid = req.params.sid,
        days = req.params.days.split('t');
    var start = days[0],
        end = days[1];
    var userRole = req.session.user ? req.session.user.role : null;
    
    if(!userRole){
      return next({err: 'login'})
    }
    
    Dao.findByDay(aid, sid, start, end, function(data){
      next(dealDaysData(data, start, end, userRole));
    });
  },

  downloadByDays: function(req, res, next){
    var aid = req.params.aid,
        sid = req.params.sid,
        days = req.params.days.split('t');
    var start = days[0],
        end = days[1];
    var userRole = req.session.user ? req.session.user.role : null;
    
    if(!userRole){
      return next({err: 'login'})
    }
    
    Dao.downloadByDay(aid, sid, start, end, function(data){
      next(dealDownloadDaysData(data,userRole));
    });
  },

  findMedia: function(req, res, next){
    var aid = req.params.aid,
        days = req.params.days.split('t');
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
  },

  downloadMedia: function(req, res, next){
    var aid = req.params.aid,
        days = req.params.days.split('t');
    var start = days[0],
        end = days[1];
    var userRole = req.session.user ? req.session.user.role : null;
    
    if(!userRole){
      return next({err: 'login'})
    }
    
    Dao.downloadByMedia(aid, start, end, function(data){

      if(data.error){
        return next(data);
      }
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

      next(data)
    });
  },

  sspFindByDays: function(req, res, next){
    const pid = req.params.pid,
          days = req.params.days.split('t')
          userRole = req.session.user ? req.session.user.role : null;    
    const start = days[0],
          end = days[1];
    let adsid = req.query.adsid;
    adsid = adsid =="0" ? null: adsid;
    if(!userRole){
      return next({err: 'need login'})
    } 
    
    sspDao.findByDay(pid, adsid, start, end, function(data){
      next(dealDaysData(data, start, end, userRole));
    });
  },

  sspFindByHour: function(req, res, next){
    const pid = req.params.pid,
          day = req.params.day,
          userRole = req.session.user ? req.session.user.role : null;  
          
    let adsid = req.query.adsid;
    adsid = adsid =="0" ? null: adsid;
    
    sspDao.findByHour(pid, adsid, day, function(data){
        next(dealHourData(data, userRole));
    })
  }

}

module.exports = handler;