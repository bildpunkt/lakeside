const ConfigurationCollector = require('./lib/configuration');
const CommandCollector = require('./lib/commands');

module.exports = class Lakeside {
  constructor() {
    this.configuration = new ConfigurationCollector().resolveConfiguration();
    this.commands = new CommandCollector(this.configuration).collectCommands();

    let cliArguments = process.argv.slice(2);
    if (cliArguments.includes('--config')) {
      cliArguments.splice(cliArguments.indexOf('--config'), 2);
    }

    this.run(cliArguments);
  }

  run(commands) {
    let that = this;
    const promises = [];

    commands.forEach(function (commandArgument) {
      const commandKeys = Object.keys(that.commands);

      if (commandKeys.includes(commandArgument)) {
        promises.push(
          (new that.commands[commandArgument](that)).runCommand()
        );
      }
      else {
        throw new Error(`Command '${commandArgument}' does not exist!`);
      }
    });

    Promise.all(promises).then();
  }
}