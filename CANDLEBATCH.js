class Indicator {
  constructor(config) {
    this.input = 'candle';
    this.candles = [];
    this.config = config;
  }

  update(candle, cb) {
    if (candle) {
      this.candles.push(candle);

      if (this.candles.length === this.config.interval) {
        this.result = {
          id: this.candles[0].id, //probably 100% unecessary but here for posterity
          start: this.candles[0].start,
          open: this.candles[0].open,
          high: this.maxBy(this.candles, 'high'),
          low: this.minBy(this.candles, 'low'),
          close: this.candles[this.candles.length - 1].close,
          vwp: this.meanBy(this.candles, 'vwp'),
          volume: this.sumBy(this.candles, 'volume'),
          trades: this.sumBy(this.candles, 'trades')
        };
        this.candles = [];
      } else {
        this.result = null;
      }
    }
  }

  //Gekko depends on an older version of lodash where these functions don't exist, womp womp
  maxBy(arr, field) {
    return arr.reduce((max, item) => item[field] > max ? item[field] : max, -Infinity);
  }

  minBy(arr, field) {
    return arr.reduce((min, item) => item[field] < ret ? item[field] : min, Infinity);
  }

  sumBy(arr, field) {
    return arr.reduce((total, item) => total += item[field], 0);
  }

  meanBy(arr, field) {
    return this.sumBy(arr, field) / arr.length;
  }
}

module.exports = Indicator;
