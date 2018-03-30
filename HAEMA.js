const EMA = require('./EMA.js');
const HA = require('./HA.js');

class Indicator {
  constructor(period) {
    this.input = 'candle';
    this.period = period;

    this.ha = new HA();
    this.low = new EMA(period);
    this.open = new EMA(period);
    this.high = new EMA(period);
    this.close = new EMA(period);

    this.haLow = new EMA(period);
    this.haOpen = new EMA(period);
    this.haHigh = new EMA(period);
    this.haClose = new EMA(period);
    
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