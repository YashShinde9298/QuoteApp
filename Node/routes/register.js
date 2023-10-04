const express = require('express');
const config = require("config");
const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: config.get("host"),
    user: config.get("user"),
    password: config.get("password"),
    database: config.get("database")
})

const appForRegister = express.Router();

appForRegister.post("/", (request, response) => {
    console.log(request.body.first_name);
    var query = `insert into users(first_name, last_name, email, password, mobile) values('${request.body.first_name}', '${request.body.last_name}', '${request.body.email}', '${request.body.password}', '${request.body.mobile}')`;
    connection.query(query, (error, result) => {
        if (error == null) {
            var data = JSON.stringify(result);
            console.log(data);
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

appForRegister.get("/:id", (request, response) => {
    console.log("hii from edit users")
    var query = `select  first_name,last_name,email,mobile from users where id = ${request.params.id}`;
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

appForRegister.put("/:id", (request, response) => {
    console.log("hii from edit users")
    var query = `update users set mobile = ${request.body.mobile},first_name = '${request.body.first_name}',last_name= '${request.body.last_name}',email = '${request.body.email}' where id = ${request.params.id}`;
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
module.exports = appForRegister;