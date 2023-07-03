const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const PORT = config.PORT;
const { PROJECTS , TASKS, USERS } = config.QUERYS;
const db = require('./services/db');
const app = module.exports = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/projects', require('./controllers/projects'));
app.use('/tasks', require('./controllers/tasks'));
app.use('/users', require('./controllers/users'));
app.use('/members', require('./controllers/members'));

db.connect();

app.listen(PORT, () => {
    console.log(`Connected succesfully to PORT: ${PORT}`)
});

