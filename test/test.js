const {describe, it} = require('mocha');
var assert = require('chai').assert;
const msgs = require('../messages');
const udpServer = require('../lib/udp4server');
const send = require('./../send');
const sender = require('./../sender');


describe('UDP Server', function() {
	udpServer.Run();

	send('my message', 3002, 'localhost');
	
	it('sent and recieved generic data', () => {
		setTimeout(() => {assert.equal(udpServer.Msg, 'my message');}, 1000);
	});
	console.log(udpServer.Msg);

	sender(0, 'on', 3002, 'localhost');

	it('sent and recieved sender data', () => {
		setTimeout(() => {assert.equal(udpServer.Msg, 'all_on\r\n');}, 1000);
	});
	console.log(udpServer.Msg);
	
	sender(2, 'on', 3002, 'localhost');

	it('sent and recieved sender data', () => {
		setTimeout(() => {assert.equal(udpServer.Msg, 'all_on\r\n');}, 1000);
	});
	console.log(udpServer.Msg);
	
});


describe('Messages', function() {

	var FEED = 5;
    
	describe('is base messages', () => {
		var messages = msgs(0);

		it('messages should not be null', () => {
			assert.isNotNull(messages);
		});
		it('messages.on should be defined', () => {
			assert.isDefined(messages['0'].on);
		});
		it('messages.off should be defined', () => {
			assert.isDefined(messages['0'].off);
		});
	});
    
	describe('is numbered messages', () => {
		
		var messages = msgs(FEED);

		it('messages should not be null', () => {
			assert.isNotNull(messages);
		});
		it('messages.on should be defined', () => {
			assert.isDefined(messages[FEED.toString()].on);
		});
		it('messages.off should be defined', () => {
			assert.isDefined(messages[FEED.toString()].off);
		});
	});
    
});
