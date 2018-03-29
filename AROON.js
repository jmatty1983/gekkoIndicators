class Indicator {
  constructor(config) {
    this.input = 'candle';
    this.highs = [];
    this.lows = [];
    this.period = config.period;
  }

  update(candle) {
    this.highs.push(candle.high);
    this.lows.push(candle.low);

    if (this.highs.length < this.period) {
      return;
    }

    let highIdx = this.highs.indexOf(Math.max.apply(null, this.highs)) + 1;
    let lowIdx = this.lows.indexOf(Math.min.apply(null, this.lows)) + 1;

    this.result = {
      aroonUp: ((this.period - (this.period - highIdx)) / this.period) * 100,
      aroonDown: ((this.period - (this.period - lowIdx)) / this.period) * 100,
    };

    this.highs.shift();
    this.lows.shift();
  }
}

module.exports = Indicator;
