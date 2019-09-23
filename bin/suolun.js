#!/usr/bin/env node

const { resolve } = require('path')
const program = require('commander')
const { version } = require(resolve(__dirname, '../package.json'))
const commands = require(resolve(__dirname, "../dist/index.js"))

process.env.NODE_PATH = resolve(__dirname, "../node_modules/")

program.version(version)

program.usage('<command>')

program
    .command('add')
    .description('Add a new Template')
    .alias('a')
    .action(commands.add)

program
    .command('remove')
    .description('remove a new Template')
    .alias('r')
    .action(commands.remove)

program
    .command('list')
    .description('show Template list')
    .alias('l')
    .action(commands.list)

program
    .command('init')
    .description('init your Template')
    .alias('i')
    .action(commands.init)

program
    .command('create')
    .description('create your Template')
    .alias('c')
    .action(commands.create)



program.parse(process.argv)

if(!program.args.length){
  program.help()
}