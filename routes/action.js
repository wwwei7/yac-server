var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var doLogin = require('../controller/login')
var doCheck = require('../controller/checkLogin')
var doLogout = require('../controller/logout')

router.post('/login', function(req, res, next) {
    doLogin(req,res);
});
router.get('/logout', function(req, res, next){
    doLogout(req,res)
})

router.get('/check', function(req, res, next){
    doCheck(req,res)
})


module.exports = router;
