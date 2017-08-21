var connection = require('../connection.js');
var banner = {};

banner.findList = function(next){
    connection.query('SELECT * FROM banner_yax', 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

banner.findBybid = function(bid, next){
    connection.query('SELECT * FROM banner_yax WHERE banner_id = '+ bid,
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

banner.findByaid = function(aid, next){
    connection.query('SELECT * FROM banner_yax WHERE advertiserid = '+ aid,
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

banner.upStatus = function(values, next){
    if(!values.banner_id){
        next("banner_id doesn't exist");
    }
    connection.query(
        'UPDATE banner_yax SET ? WHERE banner_id = ?', 
        [values, values.banner_id],
        function(err, result){
        if(err) {
            next('upStatus failed')
            console.log(err.stack);
            throw err;
        }
        next({
            success: true,
            banner_id: values.banner_id,
            status: values.status
        });
    });
}


module.exports = banner;