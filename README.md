## Elmer, a node.js RabbitMQ watchdog app

Elmer watches over a RabbitMQ instance and has Slack logging capability.  Why not use the built-in Rabbit management
interface?  I don't know yet, maybe I'll figure that out as I go.

## Continuous Usage

```bash
cat .env-example > .env
vim .env                  # Add in your real credentials here
source .env
npm install --no-optional
node watcher.js
```

Why `--no-optional`?  [Here's why](https://github.com/trentm/node-bunyan/issues/216).

## Running one-off checks

_Coming soon..._
