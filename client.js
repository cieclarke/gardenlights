const dgram = require('dgram');
const options = require('./options.json');
const msgs = require('./messages');
const port = options.lsdevice.port;
const server = options.lsdevice.server;

var messages = msgs();

var Send = (msg, port, server) => {
	const client = dgram.createSocket('udp4');
	client.send(msg, port, server, (err) => {
		if(err) {
			console.log(err);
		}
	});
};

var On = (msg) => {
	var msgSend = messages[msg] ? messages[msg].on : '';
	Send(msgSend, port, server);

};

var Off = (msg) => {
	var msgSend = messages[msg] ? messages[msg].off : '';
	Send(msgSend, port, server);

};

module.exports.On = On;
module.exports.Off = Off;
