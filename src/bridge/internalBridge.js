
const { EventEmitter } = require('events');

const internalBridge = new EventEmitter();
module.exports = internalBridge;

