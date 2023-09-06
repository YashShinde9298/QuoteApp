const express = require('express');
const config = require("config");
const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: config.get("host"),
    user: config.get("user"),
    password: config.get("password"),
    database: config.get("database")
})

const appForProfile = express.Router();

appForProfile.get("/:user_id", (request, response) => {
    var query = `select user_id, first_name, last_name, email, mobile, password from users where user_id=${request.params.user_id}`;
    connection.query(query, (error, result) => {
        if (error == null) {
            var data = JSON.stringify(result);
            response.setHeader("Content-Type", "application/json");
            response.write(data);
        }
        else {
            console.log(error);
            response.setHeader("Content-Type", "application/json");
            response.write(error);
        }
        response.end();
    })
})

appForProfile.get("/:user_id", (request, response) => {
    console.log("hii from edit users")
    var query = `select first_name, last_name, email, mobile, password from users where user_id = ${request.params.user_id}`;
    connection.query(query, (error, result) => {
        if (error == null) {
            var r = JSON.stringify(result);
            response.send(r);
        }
        else {
            console.log(error);
            response.send(JSON.stringify(error));
        }
    })
})

appForProfile.put("/:user_id", (request, response) => {
    console.log("hii from edit users")
    var query = `update users set mobile = ${request.body.mobile},first_name = '${request.body.first_name}',last_name= '${request.body.last_name}',email = '${request.body.email}', password = '${request.body.password}' where user_id = ${request.params.user_id}`;
    connection.query(query, (error, result) => {
        if (error == null) {
            var r = JSON.stringify(result);
            response.send(r);
        }
        else {
            console.log(error);
            response.send(JSON.stringify(error));
        }
    })
})

module.exports = appForProfile;