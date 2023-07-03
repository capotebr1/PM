'use strict'

const config = require("../config");
const express = require("express");
const { USERS } = config.QUERYS;
const db = require("../services/db");
const bcrypt = require("bcrypt-nodejs");

const users_api = express.Router();

users_api.get("/", (req, res) => {
    db.query("SELECT * FROM users",
    (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    })
});

users_api.post("/login" , (req, res) => {
    const { email, password } = req.body.user;
    console.log(req.body);
    db.query(`SELECT * FROM users WHERE email = "${email}"`,
    (err , result) => {
        console.log(result);
        if(result.length > 0 && bcrypt.compareSync( password , result[0].password )){
            console.log(result);
            res.send(result);
        }
    })
});

users_api.get("/:email", (req, res) => {
    const email = req.params.email;
    db.query("SELECT id, name, email FROM users WHERE email = ?", email,
    (err, result) => {
        console.log(result.length);
        if(err && result.length === 0){
            throw err
        }
        console.log(result)
        res.send(result);
    })
});

users_api.post("/add" , (req, res) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    const user = { ...req.body, password: hash };
    db.query(`INSERT INTO users SET ?`, user , (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    })
});

users_api.get("/projects/:id", (req, res) => {
    const id = req.params.id;
    db.query(USERS.GET_USER_PROJECTS, id,
    (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    } );
});

module.exports = users_api;