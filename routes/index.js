var express = require('express');
var router = express.Router();
var auth = require('../controller/login');
var assets = require('../assets.config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var domain = req.headers.host.split(':')[0];
  var assetsData = assets[domain]
  res.render('index',{assets: assetsData});
});

router.get('/success', function(req, res, next) {
  auth(req,res,function(){
    res.render('success', { title: 'Success' });
  });
});

module.exports = router;
