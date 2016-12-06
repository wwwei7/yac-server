var connection = require('./connection.js');
var charge = {};

charge.insert = function(insertObj,next){
    connection.query('INSERT INTO charge SET ?',
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

charge.findByAid = function(aid, next){
    connection.query('SELECT * FROM charge WHERE advertiser_id=' + aid +' ORDER BY opt_time DESC', 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}


module.exports = charge;