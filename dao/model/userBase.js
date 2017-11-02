const Sequelize = require('sequelize')
const seqConn = require('../sequelizeConn')

const UserBase = seqConn.define('user_base', {
  name: Sequelize.STRING,
  psw: Sequelize.STRING,
  nickname: Sequelize.STRING,
  company: Sequelize.STRING,
  role: Sequelize.ENUM('admin','agency','advertiser','ssp','publisher'),
  advertiser_id: Sequelize.INTEGER,
  publisherid: Sequelize.INTEGER
})

module.exports = UserBase

