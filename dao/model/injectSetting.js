const Sequelize = require('Sequelize')
const seqConn = require('../sequelizeConn')

const inject = seqConn.define('dsp_inject_yax', {
  dspid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    queryable: true,
    unique: true
  },
  status: Sequelize.INTEGER,
  decode: Sequelize.STRING,
  confirm: Sequelize.STRING,
  bidding: Sequelize.STRING,
  send_status: Sequelize.INTEGER,
  qpc_ott: Sequelize.INTEGER,
  token: Sequelize.STRING,
  dsp_ip: Sequelize.STRING
})

module.exports = inject

