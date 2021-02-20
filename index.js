const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sender = require('./sender');
const port = 3000;

const app = express();
app.use(bodyParser.json());
	
app.get('/', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

	res.sendFile(path.join(__dirname + '/index.htm'));
});

app.get('/ba.ttf', (req, res) => {


	res.sendFile(path.join(__dirname + '/ba.ttf'));
});

app.get('/readme', (req, res) => {
	res.sendFile(path.join(__dirname + '/readme.md'));
});

app.post('/', (req, res) => {

	var reqBody = req.body;
	reqBody.readme = req.protocol + '://' + req.hostname + ':' + port + '/readme';

	if (!req.body) {
		res.status(400);
		res.type('application/json');

		return res.send({
			readme : reqBody.readme
		});
	}
	if (req.body.command == undefined || req.body.zone == undefined || req.body.host == undefined || req.body.port == undefined) {
		res.status(400);
		res.type('application/json');

		return res.send({
			command : req.body.command == undefined ? 'undefined' : req.body.command,
			zone : req.body.zone == undefined ? 'undefined' : req.body.zone,
			host : req.body.lsdevicehost == undefined ? 'undefined' : req.body.lsdevicehost,
			port : req.body.lsdeviceport == undefined ? 'undefined' : req.body.lsdeviceport,
			readme : reqBody.readme
		});
	}
				
	res.send(req.body);
		
	sender(req.body.zone, req.body.command, req.body.port, req.body.host);

});

app.listen(port, () => console.log('Listening on port ' + port));
