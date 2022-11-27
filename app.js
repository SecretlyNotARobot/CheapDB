#!/usr/bin/env node
const express = require('express');
const sql = require('mssql'); // MS Sql Server client

const app = express();

let port = normalizePort(process.env.PORT || '3000');


app.get('/db/:query', (req, res, next) => {
    let query = new sql.query(req.params.query, (err, result) =>{
        if(err){
            res.sendStatus(400);
        }
        else{
            res.send(JSON.stringify(result.recordset));
        }
        next()
    });
})

app.listen(port, ()=>{
    console.log("Listening on port " + port);
    sql.connect(process.env.CONNECTION_STRING).then(()=>console.log("Successuflly connected to DB "), (err)=>console.log(err));
})

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
module.exports = app;
