# Command Line Interface

Lakeside's main feature is the CLI, even if it's relatively simple.

* [Help (`--help`)](#help---help)
* [Configuration (`--config`)](#configuration---config)
* [Commands](#commands)

## Help (`--help`)

```shell
$ lakeside
$ lakeside --help
```

A help output is given when `lakeside` is called with the `--help` flag or no other argument being given.

The help includes a Flag reference, shortly explaining what each flag does.

Also, every found command is shown with it's name and description, which also depends on the command being visible (through the `commandVisible` field).

## Configuration (`--config`)

```shell
$ lakeside --config path/to/config.json
```

Using the config flag you can override any of the other default configuration paths to load a custom file by name/location!

## Commands

```shell
$ lakeside command1 command2 ...
```

With all flags being handled, any other argument being given is tried to be parsed as a command name. You can add as many as you want, they'll be executed in the order you write them.