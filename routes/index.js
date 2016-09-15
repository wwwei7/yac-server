var express = require('express');
var router = express.Router();
var auth = require('../controller/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success', function(req, res, next) {
  auth(req,res,function(){
    res.render('success', { title: 'Success' });
  });
});

module.exports = router;
