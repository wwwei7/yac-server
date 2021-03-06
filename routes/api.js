var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var assetsAction = require('../controller/assets');
var advertiser = require('../dao/advertiser');
var solution = require('../dao/solution');
var bannerAction = require('../controller/banner');
var solutionAction = require('../controller/solution');
var chargeAction = require('../controller/charge');
var reportAction = require('../controller/report');
var reportAdminAction = require('../controller/reportAdmin');
var trafficFilterAction = require('../controller/trafficFilter');
var antiCheatAction = require('../controller/antiCheat');
var adsAction = require('../controller/adspace');
var urlInfoAction = require('../controller/urlInfo');
var yaxUserAction = require('../controller/yax/user')
var agencyAction = require('../controller/agency');
var industryDao = require('../dao/industry');

/* ssp Actions */
var sspUserAction = require('../controller/ssp/user')
var publisherAction = require('../controller/publisher')


/* yax Actions */
var yaxBannerAction = require('../controller/yax/banner');
var yaxInjectAction = require('../controller/yax/injectSetting')
var yaxReportAction = require('../controller/yax/report')


/* 静态资源 */
router.get('/assets', function(req, res, next){
    assetsAction(req,res,function(data){
        res.send(data)
    })
})

/* User */
router.get('/user/:id', function(req, res, next) {
    var id = req.params.id;
    var sessionId = cookieParser.signedCookie(req.cookies.SESSIONID, 'yac secret hello');        

    res.header("Content-Type", "application/json;charset=utf-8");

    return res.send(JSON.stringify({'user':id}));
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
router.get('/advertiser', function(req, res, next){
    advertiser.findList(function(data){
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
    solutionAction.insert(req, res, function(state){
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
    solutionAction.listWithCost(req, res, function(data){
        return res.send(data)
    })
})
//根据type分组当前广告主所有推广计划
router.get('/solution/gtype/ad/:aid', function(req, res, next){
    solutionAction.findListByType(req, res, function(data){
        return res.send(data)
    })
})
//根据名称查找
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

/* adspace */
// 获取广告位列表
router.get('/adspace/list/:publisherID', function(req, res, next){
    adsAction.getList(req, res, function(data){
        return res.send(data)
    })
})
// 新增广告位
router.post('/adspace', function(req, res, next){
    adsAction.insert(req, res, function(data){
        return res.send(data)
    })
})
// 编辑广告位
router.post('/adspace/:adsid', function(req, res, next){
    adsAction.update(req, res, function(data){
        return res.send(data)
    })
})
// 获取广告位
router.get('/adspace/:adsid', function(req, res, next){
    adsAction.get(req, res, function(data){
        return res.send(data)
    })
})
// 检查广告位名称是否重复
router.get('/adspace/:pid/name/:name', function(req, res, next){
    adsAction.findInName(req, res, function(data){
        return res.send(data)
    })
})
/* agency */
router.get('/agency',function(req, res, next){
    agencyAction.getList(req, res, function(data){
        return res.send(data)
    })
})
router.get('/agency/:agid',function(req, res, next){
    agencyAction.get(req, res, function(data){
        return res.send(data)
    })
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
router.get('/banner/video/sid/:sid', function(req, res, next){
    bannerAction.findVideoBySid(req, res, function(data){
        return res.send(data)
    })
})
router.get('/banner/delete/:bid', function(req, res, next){
    bannerAction.delete(req, res, function(data){
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
router.get('/balance/:aid', function(req, res, next){
    chargeAction.getBalance(req, res, function(data){
        return res.send(data)
    })
})

/* report */
router.get('/report/:aid/hour/:day/', function(req, res, next){
    reportAction.findByHour(req, res, function(data){
        return res.send(data)
    })
})
router.get('/report/:aid/hour/:day/:sid', function(req, res, next){
    reportAction.findByHour(req, res, function(data){
        return res.send(data)
    })
})
router.get('/report/:aid/days/:days', function(req, res, next){
    reportAction.findByDays(req, res, function(data){
        return res.send(data)
    })
})
router.get('/report/:aid/days/:days/:sid', function(req, res, next){
    reportAction.findByDays(req, res, function(data){
        return res.send(data)
    })
})
router.get('/report/:aid/media/:days', function(req, res, next){
    reportAction.findMedia(req, res, function(data){
        return res.send(data);
    })
})

/* admin report */
router.get('/areport/ssp/:days', function(req, res, next){
    reportAdminAction.getSSP(req, res, function(data){
        return res.send(data)
    })
})
router.get('/areport/bid/:days', function(req, res, next){
    reportAdminAction.getBid(req, res, function(data){
        return res.send(data)
    })
})
router.get('/areport/hour/:day', function(req, res, next){
    reportAdminAction.getMain(req, res, function(data){
        return res.send(data)
    })
})


// ssp user
router.get('/ssplist', function(req, res, next){
    sspUserAction.getList(req, res, function(data){
        return res.send(data)
    })
})

// ssp 网页配置信息
router.get('/urlinfo/:url', function(req, res, next){
    urlInfoAction.sspFindByname(req, res, function(data){
        return res.send(data)
    })
})
//ssp 报表
router.get('/sreport/:pid/days/:days', function(req, res, next){
    reportAction.sspFindByDays(req, res, function(data){
        return res.send(data)
    })
})
router.get('/sreport/:pid/hour/:day', function(req, res, next){
    reportAction.sspFindByHour(req, res, function(data){
        return res.send(data)
    })
})
// 报表下载接口
router.get('/reportdl/:aid/days/:days', function(req, res, next){
    reportAction.downloadByDays(req, res, function(data){
        return res.send(data)
    })
})
router.get('/reportdl/:aid/hour/:day', function(req, res, next){
    reportAction.downloadByHour(req, res, function(data){
        return res.send(data)
    })
})
router.get('/reportdl/:aid/media/:days', function(req, res, next){
    reportAction.downloadMedia(req, res, function(data){
        return res.send(data);
    })
})

/* 流量过滤 */
router.get('/trafficFilter/:aid', function(req, res, next){
    trafficFilterAction.getByAid(req, res, function(data){
        return res.send(data);
    })
})
router.post('/trafficFilter/:aid', function(req, res, next){
    trafficFilterAction.insert(req, res, function(data){
        return res.send(data);
    })
})
/* 反作弊 */
router.get('/antiCheat/:aid', function(req, res, next){
    antiCheatAction.getByAid(req, res, function(data){
        return res.send(data);
    })
})
router.post('/antiCheat/:aid', function(req, res, next){
    antiCheatAction.insert(req, res, function(data){
        return res.send(data);
    })
})

/* ssp */
// 获取所有媒体列表
router.get('/publisherlist', function(req, res, next){
    publisherAction.findListAll(req, res, function(data){
        return res.send(data)
    })
})
// 获取ssp下媒体列表
router.get('/publisherlist/:uid', function(req, res, next){
    publisherAction.findList(req, res, function(data){
        return res.send(data)
    })
})
// 新增媒体
router.post('/publisher', function(req, res, next){
    publisherAction.insert(req, res, function(data){
        return res.send(data)
    })
})
// 检查媒体登录名称是否存在
router.get('/publisher/username/:username', function(req, res, next){
    publisherAction.findInLoginName(req, res, function(data){
        return res.send(data)
    })
})
// 检查媒体名称是否存在
router.get('/publisher/:pid/name/:name', function(req, res, next){
    publisherAction.findInName(req, res, function(data){
        return res.send(data)
    })
})
//获取媒体信息
router.get('/publisher/:id', function(req, res, next){
    publisherAction.findById(req, res, function(data){
        return res.send(data)
    })
})
//更新媒体信息
router.post('/publisher/up', function(req, res, next){
    publisherAction.update(req, res, function(data){
        return res.send(data)
    })
})
//获取登录名称及检验密码
router.get('/publisher/account/findname', function(req, res, next){
    publisherAction.findAccount(req, res, function(data){
        return res.send(data)
    })
})
/* yax */
// 检查yax登录名称是否存在
router.get('/yax/username/:username', function(req, res, next){
    yaxUserAction.findNameExist(req, res, function(data){
        return res.send(data)
    })
})
//yax banner
router.get('/yax/banner', function(req, res, next){
    yaxBannerAction.findList(req, res, function(data){
        return res.send(data)
    })
})
//更新密码
router.post('/publisher/account/updatepws', function(req, res, next){
    publisherAction.updateAccount(req, res, function(data){
        return res.send(data)
    })
})

/* yax */
//yax banner
router.get('/yax/banner/dspid', function(req, res, next){
    yaxBannerAction.findByDspid(req, res, function(data){
        return res.send(data)
    })
})
router.get('/yax/banner', function(req, res, next){
    yaxBannerAction.findList(req, res, function(data){
        return res.send(data)
    })
})
router.post('/yax/banner/audit', function(req, res, next){
    yaxBannerAction.upStatus(req, res, function(data){
        return res.send(data)
    })
})

//yax dsp setting
router.get('/yax/injects/:id', function(req, res, next){
    yaxInjectAction.findById(req, res, function(data){
        return res.send(data)
    })
}) 
router.post('/yax/injects', function(req, res, next){
    yaxInjectAction.update(req, res, function(data){
        return res.send(data)
    })
}) 
//yax report
router.get('/yax/report/summary/:dspid', function(req,res,next){
    yaxReportAction.findSummary(req, res, function(data){
        return res.send(data)
    })
})
router.get('/yax/report/:dspid/days/:days', function(req,res,next){
    yaxReportAction.findByDay(req, res, function(data){
        return res.send(data)
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
