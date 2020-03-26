const fs = require('fs');
const path = require('path');

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

    for (const file of commandFiles) {
      const command = require(
        path.join(
          process.cwd(),
          this.configuration['commandDirectory'],
          file
          )
        );
      
      commands[command.commandName()] = command;
    }

    return commands;
  }
}