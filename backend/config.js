module.exports = {
    PORT: process.env.PORT || 5000,
    QUERYS: {
        PROJECTS: {
            GET_PROJECTS: 
                `SELECT u.name AS username, u.email, p.*
                FROM users AS u
                INNER JOIN projects AS p
                ON u.id = p.user_id && p.user_id = ?`,
            UPDATE_PROJECT: ( name, description, id ) => `UPDATE projects SET name = "${name}", description = "${description}" WHERE id = ${id}`,
            DELETE_PROJECT: "DELETE FROM projects WHERE id = ?",
            POST_PROJECT: "INSERT INTO projects SET ?",
        },
        TASKS: {
            GET_ADMIN_TASKS: (id) => `SELECT t.*, GROUP_CONCAT(CONCAT(u.name, "|", u.id)) as members, tu.task_owner AS ownerID FROM task_user AS tu INNER JOIN tasks AS t ON tu.task_id = t.id INNER JOIN users AS u ON tu.user_id = u.id WHERE projects_id = ${id} GROUP BY (tu.task_id)` ,
            GET_MEMBER_TASKS: (memberID, projectID) => `SELECT t.*, GROUP_CONCAT(CONCAT(u.name, "|", u.id)) as members, tu.task_owner AS ownerID  FROM task_user AS tu  INNER JOIN tasks AS t  ON tu.task_id = t.id  INNER JOIN users AS u  ON tu.user_id = u.id  WHERE projects_id = ${projectID} && tu.user_id = ${memberID} GROUP BY (tu.task_id)`,
            GET_TASKS: (id) => `SELECT t.*, COUNT(tu.user_id) AS members FROM task_user AS tu JOIN tasks AS t ON tu.task_id = t.id && t.projects_id = ${id} GROUP BY (tu.task_id)`,
            UPDATE_TASKS: ( completed, id ) => `UPDATE tasks SET completed = ${completed} WHERE id = ${id}` ,
            UPDATE_TASK_NAME: (id, name) => `UPDATE tasks SET name = '${name}' WHERE id = ${id}`,
            DELETE_TASKS: (id) => `DELETE FROM tasks WHERE id = ${id}`,
            POST_TASKS: "INSERT INTO tasks SET ?"
        },
        USERS: {
            GET_USER_PROJECTS: `SELECT users.id ,name FROM project_user INNER JOIN users ON project_user.user_id = users.id && project_user.project_id = ?`,
            GET_MEMBER_PROJECTS: `SELECT p.name, p.id AS project_id, p.user_id AS ownerID, u.name AS owner FROM project_user AS pu INNER JOIN projects AS p ON pu.project_id = p.id RIGHT JOIN users AS u ON p.user_id = u.id WHERE pu.user_id = ?`
        }
    },
    DB_CONNECTION: {
        host: 'localhost',
        user: 'root',
        database: 'test2',
        password: "",
        port: "3306"
    }
}