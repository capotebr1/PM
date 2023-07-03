const mysql = require("mysql2");
const config = require("../config");

const db = mysql.createConnection(config.DB_CONNECTION,);

module.exports = db;