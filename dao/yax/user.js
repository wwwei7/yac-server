var connection = require('../connection.js');
const seqConn = require('../sequelizeConn')
const userModel = require('../model/userYax')
const injectModel = require('../model/injectSetting')

var user = {};

var _getRandomToken = function(){
    var hex = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
    var hexArr = hex.split(',');
    var secret = '';
    for(let i=0;i<64;i++){
      secret += hexArr[Math.floor(Math.random()*16)] 
    }
    return secret;
}

user.find = function(name,psw,done){
    // const sql = `SELECT * FROM user_yax WHERE name='${name}' AND psw='${psw}'`
    // connection.query(sql, function(err, rows, fields) {
    //     if (err) throw err;
    //     done(rows[0])
    // });

    userModel.findOne({
        where: {
            name: name,
            psw: psw
        }
    }).then(user => {
        user = user && user.dataValues
        done(user)
    })
}

user.nameExist = function(name, done){
    const sql = `SELECT * FROM user_yax WHERE name='${name}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        done(rows[0])
    });
}

user.register = function(data, done){
    // return injectModel.findOrCreate({
    //     where: {
    //     dspid: 100018,
    //     decode: _getRandomToken(),
    //     confirm: _getRandomToken(),
    //     token: _getRandomToken()
    // }}).spread((inject, created) => {
    //     console.log(created)
    // })
    return seqConn.transaction(function(t1){
        return userModel.create(data, {transaction: t1}).then(user => {
            user = user && user.dataValues;
            if(!user)
                throw new Error();
            else
                return injectModel.findOrCreate({
                    where: {
                    dspid: user.id,
                    decode: _getRandomToken(),
                    confirm: _getRandomToken(),
                    token: _getRandomToken()
                }, transaction: t1}).spread((inject, created) => {
                    console.log(created)
                })
        })
    }).then(result => {
        done(true)
    }).catch(err => {
        console.log(err)
        done(false)
    })
}

user.update = function(record, where, done){
    userModel.update(record, {
        where: where
    }).then(result =>{
        done(true)
    }).catch( err => {
        console.log(err)
        done(false)
    })
}

module.exports = user;