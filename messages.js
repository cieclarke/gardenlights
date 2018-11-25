const options = require('./options.json');
const devices = options.lsmaxdevices;

module.exports = () => {
	var messages = {
		'0' : {
			on: 'all_on\r\n',
			off: 'all_off\r\n'
		}
	};
        
	for(var i = 1; i <= devices; i++) {
		messages[i.toString()] = { on : 'area_on '+i+'\r\n', off : 'area_off '+i+'\r\n' };
	}

	return messages;
};
