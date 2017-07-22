var mysql = require('mysql');
var connection = require('../connection.js');

var report = {};


report.findByDay = function(pid, adsid, start, end, next){

    const adsCondition = adsid ? adsid : `SELECT spaceid from adspace WHERE publisherid=${pid}`;

    var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, sum(service_charge) as service, date from log_hour_yax 
    WHERE spaceid in (${adsCondition}) AND date between '${start}' AND '${end}' group by date`;

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


module.exports = report;