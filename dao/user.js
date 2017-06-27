var connection = require('./connection.js');

connection.connect(function(err){
    if(err) throw err
    console.log('DB connected')

    // var name = 'testname' + parseInt(Math.random()*100);
    // connection.query(
    //     'INSERT INTO user_base (name, psw, company, role) VALUES (?,?,?,?)',
    //     [name,'haha','disney','agency'],
    //     function(err, result){
    //         if(err) throw err
    //         console.log('data insert success')
    //         console.log(result)
    //     }
    // )
});

var user = {};

user.find = function(name,psw,done){
    var i, row, user = {},
        sql = `SELECT * FROM user_base WHERE name='${name}' AND psw='${psw}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        done(rows[0])
    });
}

module.exports = user;