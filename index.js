const ConfigurationCollector = require('./lib/configuration');
const CommandCollector = require('./lib/commands');

module.exports = class Lakeside {
  constructor() {
    this.configuration = new ConfigurationCollector().resolveConfiguration();
    this.commands = new CommandCollector(this.configuration).collectCommands();
  }

  run(commands) {
    let that = this;
    const promises = [];

    commands.forEach(function (commandArgument) {
      const commandKeys = Object.keys(that.commands);

      if (commandKeys.includes(commandArgument)) {
        promises.push(
          new that.commands[commandArgument](that).runCommand()
        );
      }
      else {
        throw new Error(`Command '${commandArgument}' does not exist!`);
      }
    });

    Promise.all(promises).then();
  }

  help() {
    const stringPadding = 40;

    console.log(`lakeside - node.js command runner

Usage:
lakeside [commands...] [flags...]

Flags:
${"--config path/to/config.js(on)".padEnd(stringPadding)}Load config from specified path
${"--help".padEnd(stringPadding)}Show this help

Commands:`);

    const that = this;
    const commandKeys = Object.keys(that.commands);
    const commandLines = [];

    commandKeys.forEach(function (command) {
      let currentCommand = that.commands[command];

      if (currentCommand.commandVisible()) {
        commandLines.push(`${currentCommand.commandName().padEnd(stringPadding)}${currentCommand.commandDescription()}`);
      }
    });

    if (commandLines.length > 0) {
      commandLines.forEach(function (line) { console.log(line) });
    } else {
      console.log('-- No commands available');
    }
  }
}