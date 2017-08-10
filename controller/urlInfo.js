var Dao = require('../dao/ssp/urlInfo');
var Moment = require('moment');


var Info = {
  sspFindByname: function(req, res, next){
    var url = req.params.url;
    Dao.sspFindByname(url, next);
  }
}

module.exports = Info;