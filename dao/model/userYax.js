const Sequelize = require('sequelize')
const seqConn = require('../sequelizeConn')

const UserYax = seqConn.define('user_yax', {
  name: Sequelize.STRING,
  psw: Sequelize.STRING,
  nickname: Sequelize.STRING,
  company: Sequelize.STRING,
})

module.exports = UserYax

