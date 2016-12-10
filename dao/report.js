var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection(config.reportdb);

var report = {};

report.findByHour =  function(aid, date, next){

  // 调试无数据，去掉advertiserid filter，上线需恢复
  var sql = 'select sum(`num`) as total, sum(`money`) as allmoney, `event_type`, hour(logtime) as hour from traffic_consume_realtime WHERE ' +
    // 'advertiserid = '+ aid +' AND '+
    'logtime between "'+ date +' 00:00:00" and "' + date + ' 23:59:59" ' +
    'group by `event_type`, hour(`logtime`) order by hour, event_type';
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


report.findByAid = function(aid, next){
    connection.query('SELECT * FROM traffic_consume_realtime WHERE advertiser_id=' + aid +' ORDER BY opt_time DESC', 
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