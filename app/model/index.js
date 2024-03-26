const config = require("../config/db");

const DataType = require("sequelize");
const sequelize = new DataType(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.DataType   = DataType;
db.sequelize = sequelize;

db.employee = require("../model/employee.model")(sequelize,DataType);
db.setting = require("../model/setting.model")(sequelize,DataType);

//connect DB One-to-One
db.employee.hasOne(db.setting, {
    onDelete: 'CASCADE'
});
db.setting.belongsTo(db.employee);

module.exports = db;