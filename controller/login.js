var session = require('express-session');
var User = require('../dao/user');


var login = function(req, res, next){
    var name = req.body.username;
    var password = req.body.password;

    var callback = function(user){
        if(user){
            req.session.user = user;
            return res.redirect('/app');
        }else{
            res.render('index', { err: '用户名或密码错误'});
        }
    };

    User.find(name,password,callback);
}

module.exports = login;