var configs = require('../assets.config.js');

module.exports = function(req, res, next){
  var domain = req.headers.host.split(':')[0];
  next(configs[domain] || configs['admin.youradcloud.com']);
}