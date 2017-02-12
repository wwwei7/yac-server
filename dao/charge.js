var connection = require('./connection.js');
var Moment = require('moment');
var charge = {};

//充值记录
charge.insert = function(insertObj,next){
    connection.query('INSERT INTO charge_history SET ?',
        insertObj,
        function(err, rows, fields){
            if (err) {
                next(err);                
                throw err;
            }
            next({
                data: rows,
                msg: 'success',
                status: 200
            });
            //更新余额 （已经使用mysql触发器）
            //charge.add(insertObj.advertiser_id, insertObj.money, next);
        })
}

//获取充值记录
charge.findByAid = function(aid, next){
    connection.query('SELECT * FROM charge_history WHERE advertiser_id=' + aid +' ORDER BY opt_time DESC', 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

//更新广告主余额
charge.add = function(aid, money, next){
    var optTime = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    connection.query('INSERT INTO `charge` (advertiser_id, money, opt_time) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE money=money+'+money,
        [aid, money, optTime],
        function(err, rows, fields){
            if (err) {
                next(err);                
                throw err;
            }
            next({
                data: rows,
                msg: 'success',
                status: 200
            });
        }
    )
}

//获取余额
charge.balance = function(aid, next){
    connection.query('SELECT * FROM charge WHERE advertiser_id=' + aid, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows[0]);
        }
    );
}


module.exports = charge;