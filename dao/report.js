var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection(config.reportdb);
var connectionT = require('./connection.js');

var report = {};

report.findByHour =  function(aid, date, next){

  // 调试无数据，去掉advertiserid filter，上线需恢复

  var sql = 'select sum(`ns`) as show_all, sum(`nc`) as click_all, sum(`winprice`) as money_all, hour(`logtime`) as hour '+
            'from traffic_consume_realtime WHERE '+
            'advertiserid = '+ aid +' AND '+
            'logtime between "'+ date +' 00:00:00" and "' + date + ' 23:59:59" ' + 
            'group by hour(`logtime`);'

  connection.query( sql, 
      function(err, rows, fields) {
          if (err) {
              next(err);                
              throw err;
          }
          next(rows);
      }
  );
}


report.findByDay = function(aid, start, end, next){

  // 调试无数据，去掉advertiserid filter，上线需恢复
  var sql = 'select sum(`ns`) as show_all, sum(`nc`) as click_all, sum(`winprice`) as money_all, date(`logtime`) as day '+
            'from traffic_consume_realtime WHERE '+
            'advertiserid = '+ aid +' AND '+
            'logtime between "'+ start +' 00:00:00" and "' + end + ' 23:59:59" ' + 
            'group by date(`logtime`);'

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

report.findMedia = function(aid, start, end, next){

  var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, media, advertiserid from log_media
             where advertiserid=${aid} AND 
             \`date\` between '${start}' and '${end}' group by media ORDER BY shows desc limit 10`;

    connectionT.query(sql, 
      function(err, rows, fields) {
        if (err) {
            next(err);                
            throw err;
        }
        next(rows);
      }
    );
}

module.exports = report;