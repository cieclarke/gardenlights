const express = require('express');
var path = require('path');
const client = require('./client');
const options = require('./options.json');
const build_folder = options.deploy.html_build_folder.endsWith('/') ? options.deploy.html_build_folder : options.deploy.html_build_folder + '/';
const file_name = options.deploy.html_file_name;

const app = express();

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/' + build_folder + file_name));
});

app.post('/:zone/on', function (req, res) {
	res.json({zone: req.params.zone + ' on'});
	client.On(req.params.zone); 
});

app.post('/:zone/off', function (req, res) {
	res.json({all: req.params.zone + ' off'});
	client.Off(req.params.zone); 
});

app.listen(options.port, () => console.log('Example app listening on port ' + options.port));
