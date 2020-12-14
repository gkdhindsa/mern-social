const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'reviewsDB',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));



app.get('/reviewss', (req, res) => {
    mysqlConnection.query('SELECT * FROM User', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.get('/reviewss/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM User WHERE reviewid = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an reviewss
app.delete('/reviewss/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM User WHERE reviewid = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});


app.post('/reviewss', (req, res) => {
    let emp = req.body;
    var sql = "SET @reviewid = ?;SET @Name = ?;SET @username = ?;SET @reviewcontent = ?; \
    CALL reviewsAddOrEdit(@reviewid,@Name,@username,@reviewcontent);";
    mysqlConnection.query(sql, [emp.reviewid, emp.Name, emp.username, emp.reviewcontent], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted User id : '+element[0].reviewid);
            });
        else
            console.log(err);
    })
});

app.put('/reviewss', (req, res) => {
    let emp = req.body;
    var sql = "SET @reviewid = ?;SET @Name = ?;SET @username = ?;SET @reviewcontent = ?; \
    CALL reviewsAddOrEdit(@reviewid,@Name,@username,@reviewcontent);";
    mysqlConnection.query(sql, [emp.reviewid, emp.Name, emp.username, emp.reviewcontent], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});



app.get('/reviewss/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Review WHERE Review_ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/reviewss/Review/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Reply WHERE Reply_ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/reviewss/reply/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Review WHERE Review_ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.delete('/reviewss/delete/user/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM User WHERE username = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

app.delete('/reviewss/delete/review/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Review WHERE Review_ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});