'use strict'

const config = require("../config");
const express = require("express");
const { TASKS } = config.QUERYS;
const db = require("../services/db");

const tasks_api = express.Router();

tasks_api.get("/:id" , ( req, res ) => {
    let id = req.params.id;
    console.log("Tareas de : " + id);
    db.query(TASKS.GET_ADMIN_TASKS(id) , (err , result) => {
        if(err) throw  err

        const mappedResult = result.map(t => {
            const splitMembers = t.members.split(",");
            const filterMembers = splitMembers.map(u => ({ id: Number(u.split("|")[1]), name: u.split("|")[0] }))
            t.members = filterMembers;
            return t;
        })
        console.log(mappedResult);
        res.send(mappedResult);
    });
});

tasks_api.post("/add" , ( req, res) => {
    let body = req.body;
    console.log(body);
    db.query(TASKS.POST_TASKS ,body , (err, result) => {
        if(err) throw err
        console.log(`Process added: ${body.name}`);
        res.send(result)
    });
});

tasks_api.put("/toggle" , ( req, res ) => {
    let body = req.body;
    db.query(TASKS.UPDATE_TASKS(body.completed, body.id) , (err, result) => {
        if(err) throw err
        console.log(`Is completed: ${body.completed} , ID: ${body.id} `); 
        res.send(result)
    });
});

tasks_api.put("/toggle/name" , ( req, res ) => {
    let body = req.body;
    db.query(TASKS.UPDATE_TASK_NAME(body.id, body.name) , (err, result) => {
        if(err) throw err
        console.log(result); 
        res.send(result)
    });
});

tasks_api.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query(TASKS.DELETE_TASKS(id) , (err, rows) => {
        if(!err){
            res.send(`Task with ID ${id} deleted succesfully`);
        }
        else{
            console.error(err)
        }
    });
});

tasks_api.put("/toggle/urgency", (req, res) => {
    const { taskID, urgency } = req.body;
    db.query(`UPDATE tasks SET urgency_id = ${urgency} WHERE tasks.id = ${taskID}`, (err, result) =>{
        if(err) throw err
        console.log(`Urgency edited`);
        res.send(result)
    })
})

tasks_api.put("/toggle/description" , (req, res) => {
    const { taskID, description } = req.body;
    db.query(`UPDATE tasks SET description = '${description}' WHERE tasks.id = ${taskID}`, (err, result) =>{
        if(err) throw err
        console.log(`Description edited`);
        res.send(result)
    })
})

tasks_api.post("/add/comment", (req, res) => {
    const body = req.body;
    db.query( `INSERT INTO comments SET ?`, body, (err, result) => {
        if(err) throw err
        console.log(`Comment added`);
        res.send(result)
    });
});


tasks_api.get("/comments/:id", (req, res) => {
    const id = req.params.id;
    db.query( `SELECT c.id, c.comment, c.user_id, c.date, c.time ,u.name FROM comments AS c INNER JOIN users AS u ON c.user_id = u.id && c.task_id = ${id}`,
    (err, result) => {
        if(err) throw err
        console.log(`Comments loaded`);
        res.send(result)
    });
})


module.exports = tasks_api;