module.exports = class BaseCommand {
  constructor(lakeside) {
    this.lakeside = lakeside;
  }

  /**
   * Name of the command, which is called in the CLI
   * 
   * ex. lakeside todo-name-command
   */
  static commandName() {
    return 'todo-name-command';
  }

  /**
   * Description of the command
   */
  static commandDescription() {
    return 'TODO: write description!';
  }

  /**
   * Determines if the command is shown in the help list
   */
  static commandVisible() {
    return true;
  }

  /**
   * Command run function called by Lakeside, promisifies the actual run-call
   */
  runCommand() {
    let that = this;

    return new Promise(function (resolve, reject) {
      resolve(that.run())
    })
  }

  /**
   * Abstract run method that should be changed in extended methods, includes ran code
   */
  run() {
    console.log('TODO: Missing implementation!');
  }
}