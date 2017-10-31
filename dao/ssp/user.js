var connection = require('../connection.js');
const seqConn = require('../sequelizeConn')
const userModel = require('../model/userBase')

var user = {};


user.find = function(name,psw,done){
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



user.register = function(data, done){

    return userModel.create(data).then(user => {
        
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