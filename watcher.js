// Local libs
var jobs = require('./jobs'),
    utils = require('./utils');

// Logging
var log = utils.getLogger({'name': 'watcher'});

jobs.getQueues().then(function(queues) {
  queues.forEach(function(queue) {
    log.info(queue.name);
  })
}, function(err) {
  log.warn(err);
});
