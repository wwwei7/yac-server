var Dao = require('../dao/report');


var handler = {

  findByHour: function(req, res, next){
    var aid = req.params.aid,
        day = req.params.day;
    Dao.findByHour(aid, day, function(data){
      var resObj = {
        showArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        clickArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        moneyArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      };
      data.forEach(function(item){
        switch(item.event_type){
          case 0: //unknow
          case 1: //bid
            break;
          case 2: //show
            resObj.showArr[item.hour] = item.total;
            break;
          case 3: //click
            resObj.clickArr[item.hour] = item.total;
            break;
        }
        resObj.moneyArr[item.hour] += item.allmoney;
      })
      next(resObj);
    });
  }
}

module.exports = handler;