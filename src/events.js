const RealEventEmitter = require('events').EventEmitter;

class EventEmitter extends RealEventEmitter {
  on() {
    console.trace('EE on');
    super.on.apply(this, arguments);
  }

  addListener() {
    console.trace('EE on');
    super.addListener.apply(this, arguments);
  }

  off() {
    console.trace('EE off');
    super.off.apply(this, arguments);
  }

  removeListener() {
    console.trace('EE off');
    super.removeListener.apply(this, arguments);
  }

  removeAllListeners() {
    console.trace('EE kaBOOOOOM');
    super.removeAllListeners.apply(this, arguments);
  }
}

module.exports = {
  EventEmitter: EventEmitter,
};
