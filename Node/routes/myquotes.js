const express = require('express');
const config = require("config");
const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: config.get("host"),
    user: config.get("user"),
    password: config.get("password"),
    database: config.get("database")
})

const appForMyQuotes = express.Router();

appForMyQuotes.get("/:user_id", (request, response) => {
    var query = `select * from quotes where user_id=${request.params.user_id}`;
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

appForMyQuotes.post("/:user_id", (request, response) => {
    var query = `insert into quotes(text, author,user_id) values('${request.body.text}', '${request.body.author}',${request.params.user_id})`;
    connection.query(query, (error, result) => {
        if (error == null) {
            var data = JSON.stringify(result);
            response.write(data);
        }
        else {
            console.log(error);
            response.write(error);
        }
    })
})


appForMyQuotes.delete("/:quote_id", (request, response) => {
    var query = `delete from quotes where quote_id = ${request.params.quote_id}`;
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

appForMyQuotes.put("/:quote_id", (request, response) => {
    var query = `update quotes set text='${request.body.text}', author='${request.body.author}' where quote_id=${request.params.quote_id}`;
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

appForMyQuotes.put("/:user_id", (request, response) => {
    var query = `select quote_id from quotes where quote_id = any(select quote_id from favourite_quotes where user_id = ${request.params.id})`;
    connection.query(query, (error, result) => {
        if (error == null) {
            var r = JSON.stringify(result);
            response.send(r);
        }
        else {
            console.log(error);
            response.send(error);
        }
    })
})

module.exports = appForMyQuotes;