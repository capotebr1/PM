'use strict'

const config = require("../config");
const express = require("express");
const { USERS } = config.QUERYS;
const db = require("../services/db");
const { TASKS } = config.QUERYS;
const members_api = express.Router();

members_api.get("/project/:id", (req, res) => {
    const id = req.params.id;
    db.query(`SELECT user_id AS id, email, users.name FROM project_user INNER JOIN users ON project_user.user_id = users.id WHERE project_user.project_id = ${id}`,
    (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    })
});

members_api.get("/member/projects/:id", (req, res) => {
    const id = req.params.id;
    db.query(USERS.GET_MEMBER_PROJECTS, id,
    (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    })
})

members_api.get("/member/:userID/tasks/:projectID", (req, res) => {
    const { userID, projectID } = req.params;
    db.query(TASKS.GET_MEMBER_TASKS(userID, projectID),
    (err, result) => {
        if(err) throw  err
        const mappedResult = result.map(t => {
            const splitMembers = t.members.split(",");
            const filterMembers = splitMembers.map(u => ({ id: Number(u.split("|")[1]), name: u.split("|")[0] }))
            t.members = filterMembers;
            return t;
        })
        console.log(mappedResult);
        res.send(mappedResult);
    })
})

members_api.delete("/delete/project", (req, res) => {
    const { project_id, user_id } = req.body 
    db.query(`DELETE FROM project_user WHERE project_id = ${project_id} && user_id = ${user_id}`,
    (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    })
})


members_api.get("/task/:id" , (req, res) => {
    const id = req.params.id;
    db.query("SELECT users.id, users.name, users.email FROM task_user INNER JOIN users ON task_user.user_id = users.id && task_user.task_id = ?", id,
    (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    })
} )

members_api.post("/add/project", (req, res) => {
    const body = req.body;
    console.log(body);
    db.query("REPLACE INTO project_user SET ?", body, (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    })
});

members_api.post("/add/task", (req, res) => {
    const body = req.body;
    console.log(body);
    console.log(body)
    db.query("INSERT INTO task_user SET ?", body, (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    })
});

members_api.delete("/task/delete", (req, res) => {
    const { userID, taskID } = req.body;
    db.query(`DELETE FROM task_user WHERE task_user.task_id = ${taskID} && task_user.user_id = ${userID}`,
    (err, result) => {
        if(err) throw  err
        console.log(result)
        res.send(result);
    })
})

module.exports = members_api;