var jobs = require('./app/jobs');

var config = module.exports;

config.WatcherTasks = [
  jobs.getQueues(),
  jobs.testSanity()
]
