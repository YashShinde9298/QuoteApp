const express = require('express');
const config = require("config");
const mysql = require('mysql2');

var connection = mysql.createConnection({
    host : config.get("host"),
    user : config.get("user"),
    password : config.get("password"),
    database : config.get("database")
})

const appForQuotes = express.Router();

appForQuotes.get("/", (request, response)=>{
    var query = `select * from quotes`;
    connection.query(query,(error, result)=>{
        if(error == null){
            var v= JSON.stringify(result);
            response.send(v);
        }
        else{
            console.log(error);
            response.send(JSON.stringify(error));
        }
    })
})

module.exports = appForQuotes;