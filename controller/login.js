var session = require('express-session');
var User = require('../dao/user');
var assets = require('../assets.config.js');

module.exports.login = function(req, res, next){
    var name = req.body.username;
    var password = req.body.password;
    var domain = req.headers.host.split(':')[0];
    var assetsData = assets[domain];

    var callback = function(user){
        if(user){
            user.advertiserid = user.advertiser_id;
            req.session.user = user;
            return res.redirect('/app');
        }else{
            res.render('index', { 
                err: '用户名或密码错误',
                assets: assets[domain]
            });        
        }
    };

    User.find(name,password,callback);
}

module.exports.loginSpa = function(req, res, next){
    var name = req.body.username;
    var password = req.body.password;

    var callback = function(user){
        if(user && (user.role == 'ssp' || user.role == 'media')){
            user.advertiserid = user.advertiser_id;            
            req.session.user = user;
            next({
                loginSuccess: 1,
                user: user
            })
        }else{
            next({
                loginSuccess: 0,
                err: '用户名或密码错误'
            })      
        }
    };

    User.find(name,password,callback);
}