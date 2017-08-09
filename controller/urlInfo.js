var Dao = require('../dao/ssp/urlInfo');
var Moment = require('moment');


var Info = {
  sspFindByname: function(req, res, next){
    var urlName = req.params.urlName;
    Dao.sspFindByname(urlName, next);
  }
}

module.exports = Info;