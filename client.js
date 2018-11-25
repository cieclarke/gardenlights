const dgram = require('dgram');
const options = require('./options.json');
const port = options.lsdevice.port;
const server = options.lsdevice.server;
const devices = options.lsmaxdevices;

var messages = {
    "0" : {
        on: 'all_on\r\n',
        off: 'all_off\r\n'
    }
};

for(var i = 1; i <= devices; i++) {
    messages[i.toString()] = { on : 'area_on '+i+'\r\n', off : 'area_off '+i+'\r\n' }
}

var Send = (msg, port, server) => {
    const client = dgram.createSocket('udp4');
    client.send(msg, port, server, (err) => {
        if(err) {
            console.log(err)
        }
    });
}

var On = (msg) => {
    var msgSend = messages[msg] ? messages[msg].on : "";
    Send(msgSend, port, server);

}

var Off = (msg) => {
    var msgSend = messages[msg] ? messages[msg].off : "";
    Send(msgSend, port, server);

}

module.exports.On = On;
module.exports.Off = Off;
