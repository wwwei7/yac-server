var express = require('express');
var router = express.Router();
var dao = require('../dao/user');


router.post('/login', function(req, res, next) {
    var name = req.body.username;
    var password = req.body.password;

    if(dao(name,password)){
        req.session.user = name;
        return res.redirect('/success');
    }
    else{
        res.send('wrong')
    }
});

module.exports = router;
