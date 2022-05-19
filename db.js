const Sequilize = require('sequelize');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

module.exports = new Sequilize('db1', username, password, {
  dialect: 'postgres',
  host: 'rc1b-oj6e7670jy0nn3yu.mdb.yandexcloud.net',
  port: '6432',
});
