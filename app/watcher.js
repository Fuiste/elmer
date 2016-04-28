// Libs
var Q = require('q');

// Local libs
var jobs = require('./jobs'),
    utils = require('./utils'),
    config = require('../config');

// Logging
var log = utils.getLogger({'name': 'watcher'});

// Module
var watcher = module.exports;

watcher.runAllTasks = function() {
  var deferred  = Q.defer();

  Q.all(config.WatcherTasks).then(function(results) {
    deferred.resolve(results);
  }, function(err) {
    deferred.reject(err);
  })

  return deferred.promise;
};

watcher.watch = function(interval) {
  watcher.runAllTasks().then(function(results) {
    log.info("Watch got", results);
  }, function(err) {
    log.warn(err);
  });
}
