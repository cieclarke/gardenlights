const lirc_node = require('lirc_node');
const sender = require('./sender');


module.exports = () => {
	console.log('IR Ready');
	lirc_node.init();
	var currentMode = '';
    
	//	lirc_node.addListener(('KEY_0', 'lightsremote', data => {
	//		currentKey = 0;
	//		sender('all', 'on', '3002', '192.168.1.105');  
	//    }, 500);
    
	const send = (zone, command) => {
		sender(zone , command, '3002', '192.168.1.105');
	};
    
	lirc_node.addListener((data) => {
		//console.log('Received IR keypress \'' + data.key + '\'\' from remote \'' + data.remote +'\'');
		if(data.remote === 'lights') {
			switch(data.key){
			case 'KEY_STAR' : 
				currentMode = 'on';
				break;
			case 'KEY_HASH' : 
				currentMode = 'off';
				break;
			case 'KEY_0' :
				currentMode == '' ? null : send('all', currentMode);
				break;
			default :
				currentMode = '';
				break;
			}
		}
	});
    
};
