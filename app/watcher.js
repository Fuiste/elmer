// Libs
var Q = require('q');

// Local libs
var jobs = require('./jobs'),
    utils = require('./utils'),
    config = require('../config');

// Logging
var log = utils.getLogger({'name': 'watcher'});

Q.all(config.WatcherTasks).then(function(results) {
  log.info(results);
}, function(err) {
  log.warn(err);
})
