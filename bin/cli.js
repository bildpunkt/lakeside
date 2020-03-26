#!/usr/bin/env node
const Lakeside = require('../index');

const lakeside = new Lakeside();

let cliArguments = process.argv.slice(2);
if (cliArguments.includes('--config')) {
  cliArguments.splice(cliArguments.indexOf('--config'), 2);
}

if (cliArguments.includes('--help')) {
  cliArguments.splice(cliArguments.indexOf('--help'), 1);

  lakeside.help();
  return 0;
}

if (cliArguments.length > 0) {
  lakeside.run(cliArguments);
} else {
  lakeside.help();
}