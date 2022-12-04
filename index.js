// ***************************************************************************
// Bank API code from Web Dev For Beginners project
// https://github.com/microsoft/Web-Dev-For-Beginners/tree/main/7-bank-project/api
// ***************************************************************************

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const pkg = require('./package.json');
const sql = require('mssql'); // MS Sql Server client


// App constants
const port = process.env.PORT || 3000;
const apiPrefix = '/api';


// Create the Express app & setup middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/}));
app.options('*', cors());

// ***************************************************************************

// Hello World for index page
app.get('/', function (req, res) {
    return res.send("Hello World!");
})
app.get('/db/:query', (req, res, next) => {
    console.log("Query: "+req.params.query)
    let query = new sql.query(req.params.query, (err, result) =>{
        if(err){
            res.sendStatus(400);
        }
        else{
            if(result.recordset) {
                res.send(JSON.stringify(result.recordset));
            }
            else {
                res.send("[]", 200);
            }
        }
        next()
    });
})

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    sql.connect(process.env.CONNECTION_STRING).then(()=>console.log("Successuflly connected to DB "), (err)=>console.log(err));
});
  
