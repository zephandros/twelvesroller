const Sequelize = require('sequelize');

const sequelize = new Sequelize('database','user','password',{
    host:'localhost',
    dialect:'sqlite',
    logging: true,
    storage: 'database.sqlite'
});