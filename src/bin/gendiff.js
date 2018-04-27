#!/usr/bin/env node
import program from 'commander';
import genDiff from '../';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) =>
    console.log(genDiff(firstConfig, secondConfig, options.format)))
  .parse(process.argv);
