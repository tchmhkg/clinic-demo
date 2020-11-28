const config = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  timezone: config.TIMEZONE,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.consultation = require("../models/consultation.model.js")(sequelize, Sequelize);

db.user.hasMany(db.consultation);
db.consultation.belongsTo(db.user);

module.exports = db;
