var EMA = require('./EMA.js');

class Indicator {
  constructor(config) {
    this.input = 'candle';
    this.r = new EMA(config.r);
    this.s = new EMA(config.s);
    this.u = new EMA(config.u);
    this.rAbs = new EMA(config.r);
    this.sAbs = new EMA(config.s);
    this.uAbs = new EMA(config.u);
    this.previousCandle = null;
  }

  update(candle) {
    if (!this.previousCandle) {
      this.previousCandle = candle;
      this.result = null;
      return;
    }

    const hmu = candle.high - this.previousCandle.high > 0 ? candle.high - this.previousCandle.high : 0;
    const lmd = candle.low - this.previousCandle.low < 0 ? this.previousCandle.low - candle.low : 0;

    const price = hmu - lmd;
    const priceAbs = Math.abs(price);

    this.r.update(price);
    this.s.update(this.r.result);
    this.u.update(this.s.result);

    this.rAbs.update(priceAbs);
    this.sAbs.update(this.rAbs.result);
    this.uAbs.update(this.sAbs.result);

    const val1 = 100 * this.u.result;
    const val2 = this.uAbs.result;

    this.result = val2 !== 0 ? val1 / val2 : 0;

    this.previousCandle = candle;
  }

}

module.exports = Indicator;

