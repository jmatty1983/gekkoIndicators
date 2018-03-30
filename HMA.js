var WMA = require('./WMA.js');

class Indicator {
  constructor (period) {
    this.input = 'price';
    this.period = period;
    this.result = false;

    this.frontWMA = new WMA(Math.round(period / 2));
    this.backWMA = new WMA(period);
    this.HMA = new WMA(Math.round(Math.sqrt(period)));
  }

  update(price) {
    this.frontWMA.update(price);
    this.backWMA.update(price);

    if (!this.frontWMA.result || !this.backWMA.result) {
      this.result = null;
      return;
    }

    const front = 2 * this.frontWMA.result;
    const back = this.frontWMA.result;

    this.HMA.update(front - back);
    this.result = this.HMA.result;
  }  
}

module.exports = Indicator;
