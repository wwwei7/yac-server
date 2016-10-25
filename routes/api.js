var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');


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

//404 api
router.get('*', function(req, res, next){
    res.json({data:'',err:'api not exist'})
})

module.exports = router;
