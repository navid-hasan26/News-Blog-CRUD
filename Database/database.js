const Sequelize = require("sequelize");
const mysql = require("mysql");

const sequelize = new Sequelize("employee", "root", "12345", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;