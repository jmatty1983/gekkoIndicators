class Indicator {
  constructor(config) {
    this.input = 'candle';
    this.candles = [];
    this.config = config;
  }

  update(candle, cb) {
    console.log(candle);
    if (candle) {
      this.candles.push(candle);

      if (this.candles.length === this.config.interval) {
        this.result = {
          id: this.candles[0].id, //probably 100% unecessary but here for posterity
          start: this.candles[0].start,
          open: this.candles[0],
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
    let ret = -Infinity;

    arr.forEach(item => {
      ret = item[field] > ret ? item[field] : ret;
    });

    return ret;
  }

  minBy(arr, field) {
    let ret = Infinity;

    arr.forEach(item => {
      ret = item[field] < ret ? item[field] : ret;
    });

    return ret;
  }

  sumBy(arr, field) {
    let ret = 0;

    arr.forEach(item => {
      ret += item[field];
    });

    return ret;
  }

  meanBy(arr, field) {
    let ret = 0;

    arr.forEach(item => {
      ret += item[field];
    });

    return ret / arr.length;
  }
}

module.exports = Indicator;
