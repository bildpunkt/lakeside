const BaseCommand = require('lakeside/lib/commands/base');

module.exports = class HelloNameCommand extends BaseCommand {
  constructor(lakeside) {
    super(lakeside);
  }

  static commandName() {
    return 'hello-name';
  }

  static commandDescription() {
    return 'Greets someone!';
  }

  static commandVisible() {
    return true;
  }

  run() {
    console.log(`Hello, ${this.lakeside.configuration['name']}!`);
  }
}