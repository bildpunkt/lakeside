# Configuration

Lakeside supports many different ways of being configured. 

The following list is all of the currently available ones, listed from lowest priority to highest:
* [Environment variables](#environment-variables)
* [`npm` context environment variables](#npm-context-environment-variables)
* [`package.json` configuration-key](#packagejson-configuration-key)
* [`.lakesiderc` in current directory](#lakesiderc-in-current-directory)
* [`--custom` specified path to configuration file](#--custom-specified-path-to-configuration-file)

Even if multiple configurations are found or specified, Lakeside will always prefer the one with the highest priority.

## Configuration Options

| Option             | Type     | Description |
|--------------------|----------|-------------|
| `commandDirectory` | `string` | Directory Lakeside should search commands in. Multiple directories should be separated by a comma |

You are free to put anything you want into Lakesides configuration. Everything present in the configuration files will be made available to every command!

## Reference

### Environment variables

Lakeside will use every environment variable prefixed with `lakeside_`.

After that initial prefix, every further underscore (`_`) will denote a level in nesting, so that you can create a JSON-like structure that can later be accessed in commands.

**Example:**

```env
lakeside_sass_outputDir=./public/css
```

would be available like so in the configuration:

```js
this.lakeside.configuration['sass']['outputDir']
// => ./public/css
```

### `npm` context environment variables

If a command is executed inside the `package.json` `scripts` section, it will have access to environment variables set by `npm`.

With Lakeside being configured in the `package.json` under a `"lakeside"` root-key, Lakesides configuration in the `npm` environment will be prefixed as `npm_package_lakeside_`.

While configuration inside `package.json` will always be preferred to this. It might be possible that the `package.json` is not available in the directory lakeside is executed from.

The rest of the configuration follows the [Environment variables](#environment-variables) section.

### `package.json` configuration-key

Inside your `package.json` root level, you can create a new `lakeside` key to hold the configuration for Lakeside, like so:

```json
{
  "name": "testpackage",
  "version": "0.0.1",
  "description": "Just an example",
  // ...
  "lakeside": {
    "commandDirectory": "./path/to/commands"
  }
}
```

### `.lakesiderc` in current directory

As Lakeside is also available as general CLI tool, you can also place a `.lakesiderc` file containing the configuration where you intend to run it.

Following rules for file extensions:
* `.lakesiderc` will be interpreted as **JavaScript**
* `.lakesiderc.js` will be interpreted as **JavaScript**
* `.lakesiderc.json` will be interpreted as **JSON**

To configure Lakeside using JavaScript, simply export an object containing the configuration:

```js
module.exports = {
  commandDirectory: './path/to/commands',
}
```

JSON is just as simple:

```json
{
  "commandDirectory": "./path/to/commands"
}
```

### `--custom` specified path to configuration file

When running Lakeside over the CLI, you can specify a custom configuration file path/name using the `--custom` flag. The file you point to is to be configured like in the [`.lakesiderc` in current directory](#lakesiderc-in-current-directory)-section