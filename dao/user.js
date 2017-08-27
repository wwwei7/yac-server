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
    const sql = `SELECT * FROM user_base WHERE name='${name}' AND psw='${psw}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        done(rows[0])
    });
}

user.nameExist = function(name, done){
    const sql = `SELECT * FROM user_base WHERE name='${name}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        done(rows[0])
    });
}

/**
 * 查找user包含publisher或advertiser等子集对象
 * @params type String; 
 * type值决定子对象类型：
 *  dsp系统: advertiser
 *  ssp系统: publisher
 * 
 */
user.findExtra = function(name, psw, done, type){
    let subKeyInUser, subIdKey;
    if(type == 'advertiser'){
        subIdKey = subKeyInUser = type + '_id';
    }else if(type == 'publisher'){
        subKeyInUser = type + 'id';
        subIdKey = 'id';
    }
    else{
        return done({
            err: 1,
            errMsg: 'type empty'
        })
    }
    const sql = `select u.*, sub.name as ${type}_name
        from user_base as u
        left join ${type} as sub on u.${subKeyInUser} = sub.${subIdKey}
        WHERE u.name='${name}' AND u.psw='${psw}'`

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        done(rows[0])
    });
}

module.exports = user;