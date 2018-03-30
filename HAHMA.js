const HMA = require('./HMA.js');
const HA = require('./HA.js');

class Indicator {
  constructor(config) {
    this.input = 'candle';

    this.ha = new HA();
    this.low = new HMA(config.layer1);
    this.open = new HMA(config.layer1);
    this.high = new HMA(config.layer1);
    this.close = new HMA(config.layer1);

    this.haLow = new HMA(config.layer2);
    this.haOpen = new HMA(config.layer2);
    this.haHigh = new HMA(config.layer2);
    this.haClose = new HMA(config.layer2);
    
    this.result = null;
  }

  update(candle) {
    this.low.update(candle.low);
    this.open.update(candle.open);
    this.high.update(candle.high);
    this.close.update(candle.close);

    if (!this.low.result) {
      return;
    }

    this.ha.update({
      low: this.low.result,
      high: this.high.result,
      open: this.open.result,
      close: this.close.result
    });

    if (!this.ha.result) {
      return;
    }

    this.haLow.update(this.ha.result.low);
    this.haOpen.update(this.ha.result.open);
    this.haHigh.update(this.ha.result.high);
    this.haClose.update(this.ha.result.close);

    if (!this.haLow.result) {
      return;
    }

    this.result = {
      low: this.haLow.result,
      open: this.haOpen.result,
      high: this.haHigh.result,
      close: this.haClose.result
    };
  }
}

module.exports = Indicator;