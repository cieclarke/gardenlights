const dgram = require('dgram');

module.exports = (msg, port, server) => {
	
	const client = dgram.createSocket('udp4');
	client.send(msg, port, server, (err) => {
		if(err) {
			console.log(err);
		}
	});

};
