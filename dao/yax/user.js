var connection = require('../connection.js');

var user = {};

user.find = function(name,psw,done){
    const sql = `SELECT * FROM user_yax WHERE name='${name}' AND psw='${psw}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        done(rows[0])
    });
}

user.nameExist = function(name, done){
    const sql = `SELECT * FROM user_yax WHERE name='${name}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        done(rows[0])
    });
}

module.exports = user;