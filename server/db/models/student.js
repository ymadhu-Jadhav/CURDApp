const Sequelize = require('sequelize')
const db = require('../db')

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    }
})


module.exports = Student

