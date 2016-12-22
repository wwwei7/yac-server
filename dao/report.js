var mysql = require('mysql');
var config = require('../config');
var connection = require('./connection.js');

var report = {};

report.findByHour =  function(aid, date, next){
  
  var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, hour from log_hour 
            where advertiserid=${aid} and \`date\`='${date}' group by hour;`

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

  var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, date from log_hour 
            WHERE advertiserid='${aid}' AND date between '${start}' AND '${end}' group by date`;

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