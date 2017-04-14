var configs = require('../assets.config.js');

module.exports = function(req, res, next){
  var domain = req.headers.host.split(':')[0];
  configs.domain = req.headers;
  next(configs);
}