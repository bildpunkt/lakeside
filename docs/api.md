# API

The main two classes with outside usage and their interfaces:

* [`Lakeside` (`index.js`)](#lakeside)
* [`BaseCommand` (`lib/commands/base.js`)](#basecommand)

## Lakeside

### Fields

#### `configuration`

**Type:** Object

**Description:** Contains configuration that has been parsed from any of the preferred configuration sources.

#### `commands`

**Type:** Object

**Description:** Object containing all commands that have been found in any of the configured command directories. The keys are the `commandName` of a command, and the value is the required class, which is based off `BaseCommand`.

### Methods

#### `help()`

**Description:** Prints the help to the console, with a guide of the available flags and the names and descriptions of all visible commands.

#### `run(commands)`

**Arguments:**
* `commands` - `string[]`

**Description:** Runs the given commands from the `commands` parameter.

## `BaseCommand`

### Fields

#### `lakeside`

**Description:** Instance of [`Lakeside`](#lakeside)

### Static Methods

#### `commandName`

**Description:** Name of the command, which is called in the `Lakeside` `run()` method.

#### `commandDescription`

**Description:** Description of the command, which is shown in the `Lakeside` `help()` method.

#### `commandVisible`

**Description:** Boolean value determining if the command should be shown in the output of the `Lakeside` `help()` method.

### Methods

#### `runCommand()`

**Description:** Returns a promise of the commands `run()` method, this is called by `Lakeside`s `run()` method.

#### `run()`

**Description:** Abstract method that contains the code of the command, is run by `runCommand()`.