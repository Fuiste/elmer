// Libs
var request = require('superagent'),
    bunyan = require('bunyan'),
    BunyanSlack = require('bunyan-slack'),
    PrettyStream = require('bunyan-prettystream')

// Rabbit credentials
var rabbitURL = process.env.PUSH_RABBIT_URL;
var rabbitUser = process.env.PUSH_RABBIT_USER;
var rabbitPass = process.env.PUSH_RABBIT_PASS;

// Logging + Slack integration
var prettyStdOut = new PrettyStream({mode: 'short'});
var streams = [{
  level: process.env.DEFAULT_LOG_LEVEL || 'info',
  type: 'raw',
  stream: prettyStdOut
}];
prettyStdOut.pipe(process.stdout);
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
  name: 'push-api-watchdog',
  streams: streams
});

request.get(rabbitURL + '/api/queues/' + rabbitUser)
       .auth(rabbitUser, rabbitPass)
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (err || !res.ok) {
           log.warn(err);
         } else {
           log.info("COOL");
         }
       });
