const Sequelize = require("sequelize")
const sequelize = require("../Database/database")
const bcrypt = require("bcryptjs")

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
 }
    
);

module.exports = Post;