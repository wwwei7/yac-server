var connection = require('./connection.js');
var Moment = require('moment');

module.exports.get = function(agid, next){
    connection.query('SELECT * FROM user_base WHERE role="agency" AND ?',
        agid,
        function(err, rows, fields){
            if (err) {
                next(err);                
                throw err;
            }
            next({
                data: rows[0],
                msg: 'success',
                status: 200
            });
        })
}

//获取全部代理商账户
module.exports.getList = function(next){
    connection.query('SELECT * FROM user_base WHERE role="agency"', 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next({
              data: rows,
              msg: 'success',
              status: 200
            });
        }
    );
}