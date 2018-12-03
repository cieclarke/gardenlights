const express = require('express');
const path = require('path');
const sender = require('./sender');

module.exports = (filePath, port, lsport, lsserver) => {

	const app = express();

	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + '/' + filePath));
	});

	app.post('/:zone/on', function (req, res) {
		res.json({zone: req.params.zone + ' on'});
		sender(req.params.zone, 'on', lsport, lsserver);
	});

	app.post('/:zone/off', function (req, res) {
		res.json({all: req.params.zone + ' off'});
		sender(req.params.zone, 'off', lsport, lsserver);
	});

	app.listen(port, () => console.log('Example app listening on port ' + port));

};