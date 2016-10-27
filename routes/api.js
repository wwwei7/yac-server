var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var advertiser = require('../dao/advertiser');

router.get('/user/:id', function(req, res, next) {
    var id = req.params.id;
    var sessionId = cookieParser.signedCookie(req.cookies.SESSIONID, 'yac secret hello');        

    res.header("Content-Type", "application/json;charset=utf-8");

    return res.send(JSON.stringify({'user':id}));
});

router.get('/product/:id', function(req, res, next) {
    var id = req.params.id;
    res.send('product id : ' + id);
});

router.post('/advertiser', function(req, res, next){
    var data = req.body;
    advertiser.insert(data, function(state){
        return res.send(state);
    })
})
router.get('/advertiser/:id', function(req, res, next){
    var id = req.params.id;
    advertiser.findById(id,function(data){
        return res.send(data)
    })
})
router.get('/advertiser/user/:uid', function(req, res, next){
    var uid = req.params.uid;
    advertiser.findByUid(uid, function(data){
        return res.send(data)
    })
})

router.get('/advertiser/:uid/name/:name', function(req, res, next){
    var uid = req.params.uid; 
    var name = req.params.name;
    advertiser.findInName(uid, name, function(data){
        return res.send(data)
    })
})

//404 api
router.get('*', function(req, res, next){
    res.json({data:'',err:'api not exist'})
})

module.exports = router;
