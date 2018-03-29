class Indicator {
  constructor() {
    this.input = 'candle';
    this.previousCandle = null;
  }

  update(candle) {
    if (!this.previousCandle) {
      this.previousCandle = candle;
      this.result = {};
      return;
    }

    this.result = {
      close: (candle.open + candle.close + candle.high + candle.low) / 4,
      open: (this.previousCandle.open + this.previousCandle.close) / 2,
      high: Math.max(candle.high, candle.open, candle.close),
      low: Math.min(candle.low, candle.open, candle.close)
    }

    this.previousCandle = candle;
  }
}

module.exports = Indicator;
