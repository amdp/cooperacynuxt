const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'user',
    {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
        name: {type: Sequelize.CHAR, allowNull: false},
        surname: {type: Sequelize.CHAR, allowNull: false},
        email:  {type: Sequelize.CHAR, unique: true, allowNull: false},
        password: {type: Sequelize.CHAR, allowNull: false},
        photo: { type: Sequelize.CHAR },
        E: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
        T: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
        C: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
        I: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
        F: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
        U: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
        D: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 4},
        active: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 1},
        roles: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 2},
        remember_token: { type: Sequelize.CHAR },
        payment_type: { type: Sequelize.CHAR },
        transaction_id: { type: Sequelize.CHAR },
        transaction_state: { type: Sequelize.CHAR },
        transaction_created_at: { type: 'DATE', defaultValue: Sequelize.NOW },
        transaction_updated_at: { type: 'DATE', defaultValue: Sequelize.NOW },
        created: { type: 'DATE', defaultValue: Sequelize.NOW },
        updated: { type: 'DATE', defaultValue: Sequelize.NOW }
    }, {
        timestamps: false
    }
)