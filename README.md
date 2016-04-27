## Elmer, a node.js RabbitMQ watchdog app

Elmer watches over a RabbitMQ instance and has Slack logging capability.  Used by Ionic to track push notification
activity and warn of excessive backlog or unacked messages.

## Continuous Usage

```
npm install --no-optional
node watcher.js
```

Why `--no-optional`?  [Here's why](https://github.com/trentm/node-bunyan/issues/216).

## Running one-off checks

_Coming soon..._
