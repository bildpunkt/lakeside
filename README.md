# lakeside

A dependency-free Node.js command/task runner!

## Prerequisites

* Node.js

## Installation

Locally inside a project:
```shell
$ npm i lakeside
```

Globally, best for `lakeside` CLI usage:
```shell
$ npm i -g lakeside
```

## Usage

Running `lakeside` on your command line will show you the CLI and flag reference, as well as all currently available commands, if configured!

**Note:** lakeside will throw errors if it can't find a configuration, so please make sure to configure it properly before attempting to use it!

## Documentation

To get lakeside up and running for your projects, follow the documentation:
* [Configuration](./docs/configuration.md)
* [Commands](./docs/commands.md)
* [Class/Command API](./docs/api.md)

## Motivation

I envisioned and built this tool because of a problem at [in2code GmbH](https://in2code.de), where we switched away from Gulp to npm scripts. With a lot of different things required for projects, we quickly amassed 46 scripts, which got confusing especially for non-frontend people that quickly need to build something.

While lakeside takes a bit more effort to configure/write than regular npm scripts, it is not limited to the CLI, so it can easily leverage all kinds of Node packages and file system features. 

With the global configuration it offers, there also is deduplication with configuration values that often have to be repeated many times in npm scripts.

It was also made to be lightweight, so it uses no dependencies at all and implements everything, from CLI argument parsing to configuration handling itself.

## Contributing

There are many ways to contribute and all of them are welcome!

* If you **found a bug** or have a **feature request**, [please report it](https://github.com/pixeldesu/lakeside/issues/new)!
* If you want to **fix a bug** or **add a feature**, [fork](https://github.com/pixeldesu/lakeside/fork) the repository and [open a Pull Request](https://github.com/pixeldesu/lakeside/compare)!

## License

lakeside is licensed under the [MIT License](./LICENSE)

