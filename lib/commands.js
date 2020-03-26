const fs = require('fs');
const path = require('path');
const BaseCommand = require('./commands/base');

module.exports = class CommandCollector {
  constructor(configuration) {
    this.configuration = configuration;
  }

  /**
   * Collects all commands found in the configured command directory
   */
  collectCommands() {
    const commands = {};

    if (this.configuration['commandDirectory'] === undefined) {
      throw new Error('Missing required configuration "commandDirectory", please configure it!');
    }

    const commandFiles = fs.readdirSync(
        path.resolve(
          fs.realpathSync(process.cwd()),
          this.configuration['commandDirectory']
        )
      ).filter(function (file) {
        return file.endsWith('.js');
      });

    let commandNames = [];

    for (const file of commandFiles) {
      commandNames = Object.keys(commands);

      const command = require(
        path.join(
          process.cwd(),
          this.configuration['commandDirectory'],
          file
          )
        );

      if (!(command.prototype instanceof BaseCommand)) {
        throw new Error(`${command.name} is not an instance of BaseCommand!`);
      }

      if (commandNames.includes(command.commandName())) {
        throw new Error(`Duplicate command '${command.commandName()}' found!`);
      }
      
      commands[command.commandName()] = command;
    }

    return commands;
  }
}