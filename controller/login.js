var session = require('express-session');
var User = require('../dao/user');


var login = function(req, res, next){
    var name = req.body.username;
    var password = req.body.password;

    var callback = function(user){
        if(user){
            req.session.user = user;
            console.log(req.session.id)
            return res.redirect('/app');
        }else{
            res.send('wrong')
        }
    };

    User.find(name,password,callback);
}

module.exports = login;