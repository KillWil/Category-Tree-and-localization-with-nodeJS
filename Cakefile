fs = require 'fs'

{print} = require 'sys'
{spawn} = require 'child_process'

buildFiles = (toDir, fromDir) ->

build = (callback) ->
  coffee = spawn 'coffee', ['-c', '-o', 'project', 'coffee']
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()
  coffee.on 'exit', (code) ->
    callback?() if code is 0

task 'build', 'Build .js from .coffee', ->
  build()

startWatching = (toDir, fromDir) ->
  coffee = spawn 'coffee', ['-w', '-c', '-o', toDir, fromDir]
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()

task 'watch', 'Watch coffee folders for changes', ->
  startWatching 'project', 'coffee'
