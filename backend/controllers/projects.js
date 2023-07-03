'use strict'

const config = require("../config");
const express = require("express");
const { PROJECTS } = config.QUERYS;
const db = require("../services/db");

const project_api = express.Router();

project_api.get("/:user" , ( req , res ) => {
    const user = req.params.user;
    db.query(PROJECTS.GET_PROJECTS ,user , (err , result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    });
});


project_api.get("/info/:id" , ( req, res ) => {
    const id = req.params.id;
    db.query( `SELECT p.id, p.user_id, p.name, p.description,p.creation_date, p.deadline, u.name AS owner, u.email FROM projects p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ${id}`, 
    (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    })
})

project_api.post("/delete/:id", (req, res) => {
    const id = req.body.id;
    db.query(PROJECTS.DELETE_PROJECT, id , (err, rows) => {
        if(!err){
            res.send(`Project with ID ${id} deleted succesfully`);
        }
        else{
            console.error(err)
        }
    });
});

project_api.post("/add" , ( req, res) => {
    let body = req.body;
    console.log(body);
    db.query(PROJECTS.POST_PROJECT ,body , (err, result) => {
        if(err) throw err
        console.log(`Project added: ${body.name} , ${body.description}`);
        res.send(result)
    });
});

project_api.put("/edit" , ( req, res ) => {
    let data = req.body;
    db.query(
        PROJECTS.UPDATE_PROJECT(
            data.name, 
            data.description, 
            data.id
        ), 
        (err, result) => {
            if(err) throw err
            console.log(`Project added: ${data.name} , ${data.description}`);
            res.send(result);
        }
    );
});



module.exports = project_api;