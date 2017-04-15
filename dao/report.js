var mysql = require('mysql');
var config = require('../config');
var connection = require('./connection.js');

var report = {};

report.findByHour =  function(aid, sid, date, next){
  const sidCondition = sid ? `AND solutionid='${sid}'` : '';  
  
  var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, sum(service_charge) as service, hour from log_hour 
            where advertiserid=${aid} ${sidCondition} and \`date\`='${date}' group by hour;`

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


report.findByDay = function(aid, sid, start, end, next){

  const sidCondition = sid ? `AND solutionid='${sid}'` : '';

  var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, sum(service_charge) as service, date from log_hour 
            WHERE advertiserid='${aid}' ${sidCondition} AND date between '${start}' AND '${end}' group by date`;

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

  var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, media, advertiserid, sum(service_charge) as service 
             from log_media
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

report.downloadByHour =  function(aid, sid, date, next){
  
  var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, sum(service_charge) as service, solutionid as sid, solution_name as sname, hour 
            from log_hour as l, solution as s
            where advertiserid=${aid} AND l.solutionid = s.id and \`date\`='${date}' group by hour, solutionid;`

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

report.downloadByDay = function(aid, sid, start, end, next){

  var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, sum(service_charge) as service, solutionid as sid, solution_name as sname, date 
            from log_hour as l, solution as s 
            WHERE advertiserid='${aid}' AND l.solutionid = s.id AND date between '${start}' AND '${end}' 
            group by date, solutionid`;

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

report.downloadByMedia = function(aid, start, end, next){

  var sql = `select sum(shows) as shows , sum(money) as money, sum(click) as click, sum(service_charge) as service, media, advertiserid from log_media
             where advertiserid=${aid} AND 
             \`date\` between '${start}' and '${end}' group by media ORDER BY shows desc limit 50`;

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