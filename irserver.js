const lirc_node = require('lirc_node');
const sender = require('./sender');


module.exports = (lsport, lsserver) => {
	console.log('IR Ready');
	lirc_node.init();

	lirc_node.addListener((data) => {
		switch(data.key){
			case 'KEY_STAR' :
				currentMode = 'on';
				break;
			case 'KEY_HASH' :
				currentMode = 'off';
				break;
			case 'KEY_0' :
				console.log('KEY_0');
				sender(0 , 'on', lsport, lsserver);
				break;
			case 'KEY_1' :
				console.log('KEY_1');
				sender(0 , 'off', lsport, lsserver);
				break;
			default :
				currentMode = 'test';
				break;
		}
	});

};
