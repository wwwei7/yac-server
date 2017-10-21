const Sequelize = require('Sequelize')
const config = require('../config');

const Op = Sequelize.Op;
const sequelize = new Sequelize(
  config.db.database, 
  config.db.user, 
  config.db.password, 
  {
    host: config.db.host,
    dialect: 'mysql',
    operatorsAliases: Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      freezeTableName: true 
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize