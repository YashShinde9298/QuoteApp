const express = require('express');
const config = require("config");
const mysql = require('mysql2');

var connection = mysql.createConnection({
    host : config.get("host"),
    user : config.get("user"),
    password : config.get("password"),
    database : config.get("database")
})

const appForLogin = express.Router();

appForLogin.post("/", (request, response)=>{
    console.log(request.body.email);
    var query = `select * from users where email='${request.body.email}' and password = '${request.body.password}'`;
    connection.query(query,(error, result)=>{
        if(error == null){
            response.send(JSON.stringify(result));
        }else{
            console.log(error);
            response.send(JSON.stringify(error))
        }
    })
})

module.exports = appForLogin;