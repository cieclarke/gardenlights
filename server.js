const express = require('express');
const client = require('./client');
var path = require('path');

app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.htm'));
})

app.post('/all/on', function (req, res) {
    res.json({all : 'on'});
    client.On("*"); 
})

app.post('/all/off', function (req, res) {
    res.json({all: 'off'});
    client.Off("*"); 
})

app.post('/:zone/on', function (req, res) {
    res.json({zone: req.params.zone + ' on'});
    client.On(req.params.zone); 
})

app.post('/:zone/off', function (req, res) {
    res.json({all: req.params.zone + ' off'});
    client.Off(req.params.zone); 
})

app.listen(3001, () => console.log(`Example app listening on port 3000`))
