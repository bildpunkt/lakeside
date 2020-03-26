#!/usr/bin/env node
const Lakeside = require('../index');

let cliArguments = process.argv.slice(2);
if (cliArguments.includes('--config')) {
  cliArguments.splice(cliArguments.indexOf('--config'), 2);
}

new Lakeside().run(cliArguments);