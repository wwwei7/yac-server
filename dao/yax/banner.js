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
    connection.query('SELECT * FROM banner_yax WHERE id = '+ bid,
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

banner.findByDspid = function(dspid, next){
    connection.query('SELECT * FROM banner_yax WHERE dspid = '+ dspid,
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

banner.findByDspidForaid = function(dspid, aid, next){
    connection.query('SELECT * FROM banner_yax WHERE dspid='+ dspid +' AND advertiserid=' + aid,
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

banner.findByDspidForbid = function(dspid, bid, next){
    connection.query('SELECT * FROM banner_yax WHERE dspid='+ dspid +' AND id=' + bid,
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
        'UPDATE banner_yax SET ? WHERE id = ?', 
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