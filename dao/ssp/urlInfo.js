var connection = require('../connection.js');
var Info = {};
var Moment = require('moment');



Info.sspFindByname = function(urlName,next){
    connection.query('SELECT * FROM url_info WHERE url_name="'+urlName+'"', 
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