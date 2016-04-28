// Libs
var request = require('superagent'),
    bunyan = require('bunyan'),
    BunyanSlack = require('bunyan-slack'),
    PrettyStream = require('bunyan-prettystream')
    Q = require('q');

// Local libs
var utils = require('./utils');

// Rabbit credentials
var rabbitURL = process.env.RABBIT_URL;
var rabbitUser = process.env.RABBIT_USER;
var rabbitPass = process.env.RABBIT_PASS;

// Logging
var log = utils.getLogger({'name': 'jobs'});

// Utility module
var jobs = module.exports;

jobs.testSanity = function() {
  return Q.resolve("foo");
}

jobs.getQueues = function() {
  var deferred = Q.defer()
  request.get(rabbitURL + '/api/queues/' + rabbitUser)
         .auth(rabbitUser, rabbitPass)
         .set('Accept', 'application/json')
         .end(function(err, res){
           if (err || !res.ok) {
             deferred.reject(err);
           } else {
             deferred.resolve("true");
           }
         });

  return deferred.promise;
}
