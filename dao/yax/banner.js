var connection = require('../connection.js');
var banner = {};

banner.findList = function(next){
    connection.query('SELECT * FROM creativity', 
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
    connection.query('SELECT * FROM creativity WHERE id = '+ bid,
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
    connection.query('SELECT * FROM creativity WHERE advertiserid = '+ aid,
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
    if(!values.id){
        next("id doesn't exist");
    }
    connection.query(
        'UPDATE creativity SET ? WHERE id = ?', 
        [values, values.id],
        function(err, result){
        if(err) {
            next('upStatus failed')
            console.log(err.stack);
            throw err;
        }
        next({
            success: true,
            id: values.id,
            status: values.status
        });
    });
}


module.exports = banner;