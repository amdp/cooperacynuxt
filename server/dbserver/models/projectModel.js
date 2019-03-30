const Sequelize = require("sequelize")

const db = {}
const sequelize = new Sequelize("coo","root","cooperacy", {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: 0,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db.sequelize.define(
    'project',
    {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoincrement: true},
      parent: {type: Sequelize.INTEGER, defaultValue: 1},
      category: {type: Sequelize.INTEGER, defaultValue: 1},
      stage: {type: Sequelize.INTEGER, defaultValue: 7},
      budget: {type: Sequelize.INTEGER, defaultValue: 0},
      hudget: {type: Sequelize.INTEGER, defaultValue: 2},
      anonymous: {type: Sequelize.TINYINT, defaultValue: 0},
      name: {type: Sequelize.CHAR, allowNull: false},
      brief: {type: Sequelize.CHAR},
      content:  {type: Sequelize.CHAR},
      image: { type: Sequelize.CHAR },
      video: { type: Sequelize.CHAR },
      date: { type: 'DATE', defaultValue: Sequelize.NOW },
      E: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
      T: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
      C: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
      I: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
      F: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
      U: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0},
      D: {type: Sequelize.TINYINT, allowNull: false, defaultValue: 0}
    },
   {
        timestamps: false
    }
)