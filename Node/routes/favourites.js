const express = require('express');
const config = require('config');
const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: config.get("host"),
    user: config.get("user"),
    password: config.get("password"),
    database: config.get("database")
})

var count = 0;

const appForFavourites = express.Router();

appForFavourites.get("/:user_id", (request, response) => {
    var query = `select distinct q.quote_id,author,fq.user_id,text from quotes q, favourite_quotes fq where q.quote_id = fq.quote_id and fq.user_id = ${request.params.user_id} `;
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

appForFavourites.post("/:quote_id/:user_id", (request, response) => {
    var query = `insert into favourite_quotes(quote_id, user_id) values (${request.params.quote_id}, ${request.params.user_id})`;
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

appForFavourites.delete("/:quote_id/:user_id", (request, response) => {
    var query = `delete from favourite_quotes where quote_id = ${request.params.quote_id} and user_id = ${request.params.user_id}`;
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

module.exports = appForFavourites;