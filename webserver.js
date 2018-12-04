const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sender = require('./sender');

module.exports = (filePath, port, lsport, lsserver) => {

	const app = express();
	app.use(bodyParser.json());
	
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + '/' + filePath));
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
		if (req.body.command == undefined || req.body.zone == undefined) {
			res.status(400);
			res.type('application/json');

			return res.send({
				command : req.body.command == undefined ? 'undefined' : req.body.command,
				zone : req.body.zone == undefined ? 'undefined' : req.body.zone,
				readme : reqBody.readme
			});
		}
		
		
		res.send(req.body);
		
		sender(req.body.zone, req.body.command, lsport, lsserver);
	});

	app.listen(port, () => console.log('Example app listening on port ' + port));

};