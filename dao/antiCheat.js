var connection = require('./connection.js');
var dao = {}

dao.insert = function(val,next){
    var sql = `INSERT INTO traffic_filter_config (advertiser_id, smart)
                VALUES (${val.advertiser_id}, '${val.smart}')
                ON DUPLICATE KEY UPDATE smart = '${val.smart}'`;
    connection.query(sql,
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


module.exports = dao;