// Libs
var bunyan = require('bunyan'),
    BunyanSlack = require('bunyan-slack'),
    PrettyStream = require('bunyan-prettystream');

// logging
var prettyStdOut = new PrettyStream({mode: 'short'});
prettyStdOut.pipe(process.stdout);

var streams = [{
  level: process.env.DEFAULT_LOG_LEVEL || 'info',
  type: 'raw',
  stream: prettyStdOut
}];

if (process.env.ENABLE_SLACK) {
  streams.push({
    level: 'error',
    stream: new BunyanSlack({
      webhook_url: process.env.SLACK_WEBHOOK
    }, function(error) {
      console.error(error);
    })
  });
}

var log = bunyan.createLogger({
  name: 'elmer-utils',
  streams: streams
});

// Utility module
var utils = module.exports;

/**
 *
 * Logger convenience tool
 *
 * Generates a logger for the worker libs.  By default, uses the log level specified in DEFAULT_LOG_LEVEL, but can be
 * overwritten with options.
 *
 **/
utils.getLogger = function(options) {
  var logName = options['name'] || 'default';
  var logLevel = process.env.DEFAULT_LOG_LEVEL || 'info';
  if (options['level']) {
    logLevel = options['level'];
  }

  var prettyStdOut = new PrettyStream({mode: 'short'});
  prettyStdOut.pipe(process.stdout);

  var streams = [{
    level: logLevel,
    type: 'raw',
    stream: prettyStdOut
  }];

  if (process.env.ENABLE_SLACK) {
    streams.push({
      level: 'error',
      stream: new BunyanSlack({
        webhook_url: process.env.SLACK_WEBHOOK
      }, function(error) {
        console.error(error);
      })
    });
  }

  return bunyan.createLogger({
    name: 'elmer-' + logName,
    streams: streams
  });
};
