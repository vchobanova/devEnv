/************************Packages***********************/
const mysql = require("mysql");
const fs = require("fs");
/*******************************************************/

const appSettings = require("../appSettings.json");
global.gPool = null;

const host = appSettings.connectionString.db.host;
const user = appSettings.connectionString.db.user;
const password = appSettings.connectionString.db.password;
const database = appSettings.connectionString.db.database;

const pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
});

global.gPool = pool;