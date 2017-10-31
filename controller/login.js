var session = require('express-session');
var User = require('../dao/user');
var UserYax = require('../dao/yax/user');
var UserSsp = require('../dao/ssp/user');
var Crypto = require('../util/crypto');
var _ = require('lodash')
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

// ssp登录action
module.exports.loginSpa = function(req, res, next){
    var name = req.body.username;
    var password = req.body.password;

    //password对称解密
    password = Crypto.decodeAES(password)
    //password哈希加密
    password = Crypto.sha256(password);

    var callback = function(user){
        if(user){
            req.session.user = user;
            let resData = _.pick(user, ['id', 'name', 'role', 'publisherid', 'publisher_name']);
            next({
                loginSuccess: 1,
                user: resData
            })
        }else{
            next({
                loginSuccess: 0,
                err: '用户名或密码错误'
            })      
        }
    };

    UserSsp.find(name,password,callback);

}



// yax登录action
module.exports.loginYax = function(req, res, next){
    var name = req.body.username;
    var password = req.body.password;

    //password对称解密
    password = Crypto.decodeAES(password)
    //password哈希加密
    password = Crypto.sha256(password);

    var callback = function(user){
        if(user){
            req.session.user = user;
            let resData = _.pick(user, ['id', 'name', 'company', 'role']);
            next({
                loginSuccess: 1,
                user: resData
            })
        }else{
            next({
                loginSuccess: 0,
                err: '用户名或密码错误'
            })      
        }
    };

    UserYax.find(name,password,callback);
}

