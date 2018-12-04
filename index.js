const options = require('./options.json');
const sender = require('./sender');
const readline = require('readline');

var currentOption = 'm';
const menu = '\nm - this menu\nx - close\n1 - all on\n2 - all off\n';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var q = () => {
	
	rl.question('option:', (answer) => {
		currentOption = answer;

		switch(currentOption) {
		case 'm' : console.log(menu); q();
			break;
		case 'x' : rl.close(); process.exit();
			break;
		case '1' : sender(currentOption, 'on', options.lsdevice.port, options.lsdevice.server); q();
			break;
		case '2' : sender(currentOption, 'off', options.lsdevice.port, options.lsdevice.server); q();
			break;
		default : break;

		}

	});

};

console.log(menu);
q();


