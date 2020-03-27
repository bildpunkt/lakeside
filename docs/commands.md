# Commands

Lakeside runs commands, and as there are no pre-defined ones, they need to be configured for every project.

Before we jump into building a command, we need to make sure that Lakeside is [properly configured](./configuration.md).

## Your First Command, by example

The command we'll be writing should simply write `"Hello, {name}!"` to the console, where `{name}` should be configurable!

* [1. Setting up the base command](#1-setting-up-the-base-command)
* [2. Setting up inheritance](#2-setting-up-inheritance)
* [3. Adjusting the metadata](#3-adjusting-the-metadata)
* [4. Removing `runCommand()`](#4-removing-runcommand)
* [5. Setting up the configuration](#5-setting-up-the-configuration)
* [6. Setting up our `run()` method](#6-setting-up-our-run-method)

### 1. Setting up the base command

Every command in Lakeside has to follow the same structure, by inheriting a base class `BaseCommand` present in the main package. You can simply take the contents of [`lib/commands/base.js`](../lib/commands/base.js) and copy them into a new file in your configured `commandDirectory`.

This should be how it looks now (comments omitted for readability):
```js
module.exports = class BaseCommand {
  constructor(lakeside) {
    this.lakeside = lakeside;
  }

  static commandName() {
    return 'todo-name-command';
  }

  static commandDescription() {
    return 'TODO: write description!';
  }

  static commandVisible() {
    return true;
  }

  runCommand() {
    let that = this;

    return new Promise(function (resolve, reject) {
      resolve(that.run())
    })
  }

  run() {
    console.log('TODO: Missing implementation!');
  }
}
```

### 2. Setting up inheritance

Before we can start coding right on our functionality, we need to make a few adjustments to that code, let's walk through them:

Firstly, we need to extend this command from the `BaseCommand`, so at the very beginning of the file we require the class, and while we're at it, we should also change the class name to `HelloNameCommand`:

```js
const BaseCommand = require('lakeside/lib/commands/base');

module.exports = class HelloNameCommand extends BaseCommand {
// ...
```

Next up we need to adjust the constructor to pass every parameter to the base class constructor, we replace `this.lakeside = lakeside;` with `super(lakeside);`

```js
constructor(lakeside) {
  super(lakeside);
}
```

### 3. Adjusting the metadata

Next up, we have some `static` methods that only return metadata around our command. The `BaseCommand` only includes placeholders we should adjust:

* `commandName` is the command as it is later executed from the command line, for our current one we'll use `'hello-name'`
* `commandDescription` describes what our command does, this will be shown in lakesides help screen, we'll keep it simple with `'Greets someone!'`
* `commandVisible` determines if the command will be visible in the help list. You can use this to hide commands that are only called by other ones.

```js
static commandName() {
  return 'hello-name';
}

static commandDescription() {
  return 'Greets someone!';
}

static commandVisible() {
  return true;
}
// ...
```

### 4. Removing `runCommand()`

The next method present here is `runCommand()`, and you can simply remove that from `HelloNameCommand` as we shouldn't touch it. This is the small piece of internal logic Lakeside uses to call the command!

### 5. Setting up the configuration

Before we get to implementing our command, we want to make the name that is greeted configurable, so we should add something to our configuration!

At the moment, it probably looks something like this:
```json
{
  "commandDirectory": "./path/to/commands"
}
```

We can alter the structure as much as we want, but for the examples sake we'll just add another key with the name to the root:
```json
{
  "commandDirectory": "./path/to/commands",
  "name": "John Doe"
}
```
### 6. Setting up our `run()` method

The last piece to everything is the `run()` method, and this is where we can finally have fun implementing our code!

```js
run() {
  console.log('Hello, {name}!');
}
```

Almost done, now we just want to put in our configured name. This is pretty easy as every command gets all of Lakeside passed along with it, which also includes the configuration. Inside a command, you'll be able to find the configuration in `this.lakeside.configuration`.

We added a `name` key to the root of our configuration, so we can access our configuration using `this.lakeside.configuration['name']`.

```js
run() {
  console.log(`Hello, ${this.lakeside.configuration['name']}!`);
}
```

---

And that's it, our command is finished!

Now, if we run `lakeside hello-name` in the command line it should print out `"Hello, John Doe!"`

_You can also find the complete source code of this example in [`examples/hello-name.js`](../examples/hello-name.js)!_