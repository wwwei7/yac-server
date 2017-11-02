var connection = require('../connection.js');
const seqConn = require('../sequelizeConn')
const userModel = require('../model/userBase')
const _ = require('lodash')

var user = {};

user.getList = function(done){
    userModel.findAll({
        where: {
            role: 'ssp'
        }
    }).then(list => {
        let arr = []
        list.map(function(item){
            arr.push(_.omit(item.dataValues, 'psw'))
        })
        done({
            success: true,
            data: arr
        })
    }).catch(err => {
        done({
            success: false,
            err: err
        })
    })
}

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