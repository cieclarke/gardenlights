const client = require('./client');
const readline = require('readline');

var currentOption = 'm';
const menu = 'm - this menu 0 - close 1 - all on 2 - all off\n';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var q = () => { rl.question('option:', (answer) => {
    currentOption = answer;

    switch(currentOption) {
        case '0' : rl.close(); process.exit();
            break;
        case '1' : client.On("0"); q();
            break;
        case '2' : client.Off("0"); q();
            break;
        default : break;

    }

  });

}

console.log(menu);
q();


