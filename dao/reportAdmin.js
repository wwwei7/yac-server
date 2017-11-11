var mysql = require('mysql');
var config = require('../config');
var connection = require('./connection.js');

var report = {};


report.findBySSP = function(start, end, next){
  var sql = `select ads.name as adsname, spaceid, adtype,size,adspacetype, log.dspid, yax.name as dspname, 
            sum(shows) as shows , sum(money) as money, sum(click) as click, sum(service_charge) as service, sum(profit_money) as profit, log.date 
            from log_hour_yax  log LEFT JOIN \`adspace\` ads ON  log.\`spaceid\` = ads.\`id\` 
            left join user_yax  yax on yax.id = log.dspid
            WHERE log.date between '${start}' AND '${end}' group by date, spaceid`;

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

report.findByBid = function(start, end, next){
  var sql = `SELECT SUM(bid_total_count) as total, SUM(bid_valid_count) as valid, SUM(bid_success_count) as success, SUM(bid_total_price) as price, SUM(bid_win_price) as win, adspaceid , ads.name as adsname, date 
            FROM bid_yax bid LEFT JOIN adspace ads on bid.adspaceid = ads.id
            WHERE date between '${start}' AND '${end}' GROUP BY date, adspaceid`;

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