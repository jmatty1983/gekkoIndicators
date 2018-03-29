const RSI = require('./RSI.js');

class Indicator {
  constructor(config) {
    this.input = 'candle';
    this.interval = config.interval;
    this.config = config;
    this.rsi = new RSI({
      interval: config.rsi
    });
    this.rsiHistory = [];
    this.stochHistory = [];
    this.kHistory = [];
  }

  update(candle) {
    this.rsi.update(candle);
    this.rsiHistory.push(this.rsi.result);

    const max = Math.max.apply(null, this.rsiHistory);
    const min = Math.min.apply(null, this.rsiHistory);
    const stoch = (this.rsi.result - min) / (max - min);
    this.stochHistory.push(stoch);

    const k = (this.sumArray(this.stochHistory) / this.stochHistory.length) * 100;
    this.kHistory.push(k);

    const d = this.sumArray(this.kHistory) / this.kHistory.length;

    this.result = {
      k,
      d
    };

    if (this.rsiHistory.length === this.config.stoch) {
      this.rsiHistory.shift();
    }

    if (this.stochHistory.length === this.config.k) {
      this.stochHistory.shift();
    }

    if (this.kHistory.length === this.config.d) {
      this.kHistory.shift();
    }
  }

  sumArray(arr) {
    return arr.reduce((acc, item) => acc + item, 0);
  }
}

module.exports = Indicator;
