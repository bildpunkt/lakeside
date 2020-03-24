const ConfigurationCollector = require('./lib/configuration');

module.exports = class Lakeside {
  constructor() {
    this.configuration = new ConfigurationCollector();
  }
}