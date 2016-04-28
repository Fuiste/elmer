// Libs
var minimist = require('minimist');

// Local libs
var watcher = require('./watcher'),
    utils = require('./utils');

// Logging
var log = utils.getLogger({'name': 'main'});

var Elmer = module.exports

Elmer.run = function(processArgv) {
  var args = minimist(process.argv.slice(2));
  var cmd = args['_'];

  if(cmd.length != 1) {
    log.warn("Invalid # of args")
    process.exit();
  } else {
    switch(cmd[0]) {
      case 'watch':
        watcher.watch(1);
        break;
      case 'run':
        watcher.runAllTasks().then(function(res) {
          log.info(res);
        })
        break;
      default:
        log.warn("Invalid arg");
    }
  }
}
