var connection = require('./connection.js');
var dao = {}

dao.insert = function(insertObj,next){
    connection.query('INSERT INTO traffic_filter_config SET ?',
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