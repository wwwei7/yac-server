var connection = require('./connection.js');
var dao = {}

dao.insert = function(val,next){
    var sql = `INSERT INTO traffic_filter_config (advertiser_id, media, location, ip) VALUES ? 
        ON DUPLICATE KEY UPDATE media=${val.media}, location=${val.location}, ip=${val.ip}`;
    connection.query(sql, val,
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
        })
}

dao.getByAid = function(aid, next){
    connection.query('SELECT * FROM traffic_filter_config WHERE advertiser_id=' + aid, 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

dao.update = function(aid, val, next){
    connection.query('UPDATE traffic_filter_config SET ? WHERE aid = ?',
        [val, aid],
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
        })
}


module.exports = dao;