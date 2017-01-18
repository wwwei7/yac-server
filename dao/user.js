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
    var i, row, user = {};
    connection.query('SELECT * FROM user_base ', function(err, rows, fields) {
        if (err) throw err;
        for(i in rows){
            row = rows[i];
            if(row.name == name && row.psw == psw){
                user.name = name;
                user.role = row.role;
                user.company = row.company;
                user.uid = row.id;
                user.advertiserid = row.advertiserid;
                done(user);
                return;
            }
        }
        done(false);
    });
}

module.exports = user;