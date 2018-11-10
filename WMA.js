class Indicator {
  constructor (period) {
    this.input = 'price';
    this.period = period;
    this.result = false;

    this.history = [];
  }

  update(price) {
    this.history.push(price);

    if (this.history.length === this.period) {
      this.result = this.getWMA();

      this.history.shift();
    }
  }

  getWMA() {
    const {total, weight} = this.history.reduce((ret, v, i) => {
      ret.total += v * (i + 1);
      ret.weight += (i + 1);
    }, {total: 0, weight: 0});

    return total / weight;
  }
}

module.exports = Indicator;
