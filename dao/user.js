var connection = require('./connection.js');
const seqConn = require('./sequelizeConn')
const userModel = require('./model/userBase')

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

user.find_ = function(queryObj, done){
    return userModel.findOne({
        where: queryObj
    }).then(user => {
        if(user && user.dataValues){
            done(user.dataValues)
        }else{
            done(null)
        }
    }).catch(err => {
        console.log(err)
        done()
    })
}

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
user.findAccount = function(data, done){
    let sql = `SELECT * FROM user_base WHERE publisherid = ${data.id}`
    if(data.psw){
        sql += ` AND psw = '${data.psw}'`
    }
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        done(rows[0])
    });
}
user.updateAccount = function(data, next){
    let sql = `UPDATE user_base SET psw='${data.psw}' WHERE publisherid = ${data.id} AND psw='${data.oldpsw}'`
    connection.query(sql, function(err, result){
        if(err) {
            next({
                success: false,
                msg: err
            })
            console.log(err.stack);
            throw err;
        }
        next({
            success: true,
            msg: 'update success'
        });
          
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