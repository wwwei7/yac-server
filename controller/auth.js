var userDao = require('../dao/user');
var session = require('express-session');

var auth = function(req, res, next){
    //检查session
    if(!req.session.user){
        return res.redirect('/');
    }else{
        next();
    }
}

module.exports = auth;