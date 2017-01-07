var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var advertiser = require('../dao/advertiser');
var solution = require('../dao/solution');
var bannerAction = require('../controller/banner');
var solutionAction = require('../controller/solution');
var chargeAction = require('../controller/charge');
var reportAction = require('../controller/report');
var industryDao = require('../dao/industry');


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

/* 广告主 */
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
//编辑广告主
router.post('/advertiser/:id', function(req, res, next){
    var id = req.params.id;
    var values = req.body;
    advertiser.update(id, values, function(data){
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

/* solution */
router.post('/solution', function(req, res, next){
    var data = req.body;
    solution.insert(data, function(state){
        return res.send(state);
    })
})

router.get('/solution/:id', function(req, res, next){
    solutionAction.findById(req, res, function(data){
        return res.send(data)
    })
})
router.post('/solution/:id', function(req, res, next){
    solutionAction.update(req, res, function(data){
        return res.send(data)
    });
})
router.get('/solution/ad/:aid', function(req, res, next){
    var aid = req.params.aid;
    solution.findByAid(aid, function(data){
        return res.send(data)
    })
})
router.get('/solution/:aid/name/:name', function(req, res, next){
    var aid = req.params.aid; 
    var name = req.params.name;
    solution.findInName(aid, name, function(data){
        return res.send(data)
    })
})

//暂停solution
router.post('/solution/pause/:id', function(req, res, next){
    solutionAction.pause(req, res, function(data){
        return res.send(data)
    });
})


/* banner */
router.post('/banner/', function(req, res, next){
    bannerAction.insert(req, res, function(data){
        return res.send(data)
    })
})
router.get('/banner/ad/:aid', function(req, res, next){
    bannerAction.findByAid(req, res, function(data){
        return res.send(data)
    })
})

/* charge */
router.get('/charge/:aid', function(req, res, next){
    chargeAction.findByAid(req, res, function(data){
        return res.send(data)
    })
})
router.post('/charge', function(req, res, next){
    chargeAction.insert(req, res, function(data){
        return res.send(data)
    })
})

/* report */
router.get('/report/:aid/hour/:day', function(req, res, next){
    reportAction.findByHour(req, res, function(data){
        return res.send(data)
    })
})
router.get('/report/:aid/days/:days', function(req, res, next){
    reportAction.findByDays(req, res, function(data){
        return res.send(data)
    })
})
router.get('/report/:aid/media/:days', function(req, res, next){
    reportAction.findMedia(req, res, function(data){
        return res.send(data);
    })
})

/* util */
router.get('/industry', function(req, res, next){
    industryDao.find(function(data){
        return res.send(data)
    })
})

//404 api
router.get('*', function(req, res, next){
    res.json({data:'',err:'api not exist'})
})

module.exports = router;
