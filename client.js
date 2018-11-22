const dgram = require('dgram');
const options = require('./options.json');
const port = options.port;
const server = options.server;
const messages = {
    on: 'all_on\r\n',
    off: 'all_off\r\n',
    "1": { on : 'area_on 1\r\n', off : 'area_off 1\r\n' },
    "2": { on : 'area_on 2\r\n', off : 'area_off 2\r\n' },
};

var Send = (msg, port, server) => {
    const client = dgram.createSocket('udp4');
    client.send(msg, port, server, (err) => {
        if(err) {
            console.log(err)
        }
    });
}

var On = (msg) => {
    var msgSend = null;

    switch(msg){
        case "*" : 
            msgSend = messages.on;
            break;
        case "1" :
        case "2" :
            msgSend = messages[msg].on;
            break;
        default :
            break;
    }

    msgSend == null ? console.log("incorrect message data") : Send(msgSend, port, server);

}

var Off = (msg) => {
    var msgSend = null;

    switch(msg){
        case "*" : 
            msgSend = messages.off;
            break;
        case "1" :
        case "2" :
            msgSend = messages[msg].off;
            break;
        default :
            break;
    }

    msgSend == null ? console.log("incorrect message data") : Send(msgSend, port, server);

}

/*
var AllOn = () => { Send(messages.on, port, server) };
var AllOff = () => { Send(messages.off, port, server) };

var PathwayStepOn = () => { Send(messages.area1.on, port, server) };
var PathwayStepOff = () => { Send(messages.area1.off, port, server) };

var FrontGardenOn = () => { Send(messages.area2.on, port, server) };
var FrontGardenOff = () => { Send(messages.area2.off, port, server) };
*/
module.exports.On = On;
module.exports.Off = Off;
/*
module.exports.AllOn = AllOn;
module.exports.AllOff = AllOff;
module.exports.PathwayStepOn = PathwayStepOn;
module.exports.PathwayStepOff = PathwayStepOff;
module.exports.FrontGardenOn = FrontGardenOn;
module.exports.FrontGardenOff = FrontGardenOff;
*/
