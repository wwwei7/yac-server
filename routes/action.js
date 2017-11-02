var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var loginAction = require('../controller/login')
var yaxUserAction = require('../controller/yax/user')
var doCheck = require('../controller/checkLogin')
var doLogout = require('../controller/logout')
var doUpload = require('../controller/bannerUpload')
var presetCity = require('../controller/presetCity')
var sspUserAction = require('../controller/ssp/user')

router.post('/login', function(req, res, next) {
    loginAction.login(req,res);
});
router.post('/loginspa', function(req, res, next) {
    loginAction.loginSpa(req,res,function(data){
        return res.send(data)
    });
});
router.post('/loginyax', function(req, res, next) {
    loginAction.loginYax(req,res,function(data){
        return res.send(data)
    });
});
router.post('/loginadmin', function(req, res, next) {
    loginAction.loginAdmin(req,res,function(data){
        return res.send(data)
    });
});
router.get('/logout', function(req, res, next){
    doLogout(req,res)
})

router.post('/ssp/register', function(req, res, next) {
    sspUserAction.register(req,res,function(data){
        return res.send(data)
    });
});
router.post('/ssp/pswreset', function(req, res, next) {
    sspUserAction.pswReset(req,res,function(data){
        return res.send(data)
    });
});
router.post('/ssp/oldPswCheck',function(req, res, next) {
    sspUserAction.oldPswCheck(req,res,function(data){
        return res.send(data)
    });
});
router.post('/ssp/publisherPsw',function(req, res, next) {
    sspUserAction.publisherPsw(req,res,function(data){
        return res.send(data)
    });
});

router.post('/yax/register', function(req, res, next) {
    yaxUserAction.register(req,res,function(data){
        return res.send(data)
    });
});
router.post('/yax/pswreset', function(req, res, next) {
    yaxUserAction.pswReset(req,res,function(data){
        return res.send(data)
    });
});

router.get('/check', function(req, res, next){
    doCheck(req,res)
})

router.post('/upload', function(req, res, next){
    doUpload(req,res)
})

router.get('/presetcity', function(req, res, next){
    presetCity(function(data){
        return res.send(data)
    })
})

module.exports = router;
