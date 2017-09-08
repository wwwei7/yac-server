var mysql = require('mysql');
var connection = require('../connection.js');
var co = require('co')

exports.findSummary = function(dspid, next){
  // dspid =69
  //历史总花费
  const sql_last_all = `SELECT sum(money)+ sum(service_charge) as money FROM log_hour_yax WHERE dspid=${dspid}`;
  //上月花费
  const sql_last_m = `SELECT  sum(money)+ sum(service_charge) as money FROM log_hour_yax WHERE PERIOD_DIFF( date_format( now( ) , '%Y%m' ) , date_format(date, '%Y%m' ) ) =1 AND dspid=${dspid}`
  //本月花费
  const sql_now_m = `SELECT sum(money)+ sum(service_charge) as money FROM log_hour_yax WHERE DATE_FORMAT( date, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' ) AND dspid=${dspid}`;
  //本日花费
  const sql_now_d = `SELECT sum(money)+ sum(service_charge) as money FROM log_hour_yax WHERE to_days(date) = to_days(now()) AND dspid=${dspid}`
  
  co(function* (){
    const data_last_all = yield new Promise(function(resolve,reject){
      connection.query( sql_last_all,
        function(err, rows, fields) {
          if (err) {
            reject(err);
          }
          resolve(rows[0])
        });
    })

    const data_last_m = yield new Promise(function(resolve,reject){
      connection.query( sql_last_m,
        function(err, rows, fields) {
          if (err) {
            reject(err);
          }
          resolve(rows[0])
        });
    })

    const data_now_m = yield new Promise(function(resolve,reject){
      connection.query( sql_now_m,
        function(err, rows, fields) {
          if (err) {
            reject(err);
          }
          resolve(rows[0])
        });
    })

    const data_now_d = yield new Promise(function(resolve,reject){
      connection.query( sql_now_d,
        function(err, rows, fields) {
          if (err) {
            reject(err);
          }
          resolve(rows[0])
        });
    })

    next({
      lastAll: data_last_all,
      lastMonth: data_last_m,
      nowMonth: data_now_m,
      nowDay: data_now_d
    })

  }).catch(function(err){
    next({
      err: 1,
      errMsg: '查询失败',
      lastAll: {money: 0},
      lastMonth: {money: 0},
      nowMonth: {money: 0},
      nowDay: {money: 0}
    })
  })
}


exports.findByDay = function(dspid, start, end, next){

    var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, sum(service_charge) as service, date from log_hour_yax 
    WHERE dspid=${dspid} AND date between '${start}' AND '${end}' group by date`;

    connection.query(sql, 
      function(err, rows, fields) {
        if (err) {
            next(err);                
            throw err;
        }
        next(rows);
      }
    );
}
