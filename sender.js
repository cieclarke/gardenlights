const send = require('./send');

module.exports = (zone, command, port, server) => {

	var msg = '';

	switch(zone) {
	case 0 : 
		msg = command == 'on' ? 'all_on\r\n' : 'all_off\r\n';
		break;
	default :
		msg = command == 'on' ? 'area_on '+zone+'\r\n' : 'area_off '+zone+'\r\n';
		break;
	}

	send(msg, port, server);
};