/* eslint-disable */
const lirc_node = require('lirc_node');
const util = require('util');
const EventEmitter = require('events').EventEmitter;
const sender = require('./sender');

class IRServer extends EventEmitter {

	constructor(){
		super();
	}


}

module.exports = (lsport, lsserver) => {

//	const init = () => { console.log("IR Ready"); };
	const x = new Promise((resolve, reject) => {
		lirc_node.init();
		resolve(lirc_node);
	});
	
	const m = x.then((ln) => {
		return new Promise((resolve, reject) => {
			var l = ln.addListener((data) => {
				resolve({data: data});
			});
		})

	});

	m.then((d) => {
		console.log(d);
	});

	/*
	lirc_node.addListener((data) => {
		switch(data.key){
			case 'CD-PLAY' :
				currentMode = 'on';
				x.then(() => { currentMode = ''; });
				break;
			case 'CD-STOP' :
				currentMode = 'off';
				x.then(() => { currentMode = ''; });
				break;
			default : break;
		}


	});

	lirc_node.addListener('CD-PLAY', function(data) {
		console.log('Received CD PLAY keypress');

		listenerID = lirc_node.addListener('KEY_0', function(data) {
			console.log('Received KEY 0 keypress');
		  });
	  });

*/
/*
	lirc_node.addListener((data) => {

		//x.then((data) => { currentMode = ''; });




		switch(data.key){
		case 'CD-PLAY' :
			currentMode = 'on';
			x.then(() => { currentMode = ''; });
			break;
		case 'CD-STOP' :
			currentMode = 'off';
			x.then(() => { currentMode = ''; });
			break;
		case 'KEY_0' :
			if(currentMode == 'on'){
				sender(0 , currentMode, lsport, lsserver);
			}
			break;
		case 'KEY_1' :
			if(currentMode == 'off'){
				sender(0 , currentMode, lsport, lsserver);
			}
			break;
		default :
			currentMode = '';
			break;
		}
	});
	*/
};
