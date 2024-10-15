const Sequelize = require("sequelize");

const sequelize = new Sequelize("new_schema", "root", "Vaibhav@123", {
  host: "localhost",
  dialect: "mysql",
  port: 3300,
});

module.exports = sequelize;
