const fs = require('fs');
const path = require('path');
const BaseCommand = require('./commands/base');

module.exports = class CommandCollector {
  constructor(configuration) {
    this.configuration = configuration;
  }

  /**
   * Collects all commands found in the configured command directories
   */
  collectCommands() {
    const that = this;
    const commands = {};

    if (this.configuration['commandDirectory'] === undefined) {
      throw new Error('Missing required configuration "commandDirectory", please configure it!');
    }

    if (this.configuration['commandDirectory'].includes(',')) {
      const directories = this.configuration['commandDirectory'].split(',');

      directories.forEach(function (directory) {
        Object.assign(commands, that.getCommandsFromDirectory(directory));
      });
    }
    else {
      Object.assign(commands, this.getCommandsFromDirectory(this.configuration['commandDirectory']));
    }

    return commands;
  }

  /**
   * Gets all commands from a given directory
   * 
   * @param {*} directory - directory to search for commands
   */
  getCommandsFromDirectory(directory) {
    const commands = {};

    const commandFiles = fs.readdirSync(
        path.resolve(
          fs.realpathSync(process.cwd()),
          directory
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
          directory,
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