const dgram = require('dgram');
const server = dgram.createSocket('udp4');

module.exports = 
{
	Run : () =>
	{

		server.on('error', (err) => {
			console.log(`server error:\n${err.stack}`);
			server.close();
		});

		server.on('message', (msg, rinfo) => {
			this.Msg = msg;
			console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
		});

		server.on('listening', () => {
			const address = server.address();
			console.log(`server listening ${address.address}:${address.port}`);
		});

		server.bind(3002, 'localhost');

	},
	Close : () => { server.close(); }

};