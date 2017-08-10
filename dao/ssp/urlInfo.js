var connection = require('../connection.js');
var Info = {};
var Moment = require('moment');



Info.sspFindByname = function(url,next){
    connection.query('SELECT * FROM user_webpage WHERE url="'+url+'"', 
        function(err, rows, fields) {
            if (err) {
                next(err);                
                throw err;
            }
            next(rows);
        }
    );
}

module.exports = Info;