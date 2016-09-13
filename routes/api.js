var express = require('express');
var router = express.Router();

router.get('/user/:id', function(req, res, next) {
    var id = req.params.id;
    res.send('user id : ' + id);
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
