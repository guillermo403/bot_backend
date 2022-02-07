const log4js = require('log4js');
const config = require('./config/config');

log4js.configure({
  appenders: {
    out: {type: "console"},
    app: {
      "type": "file",
      "filename": "/var/log/nodejs/bot_discord.log",
      "maxLogSize": config.logs.maxLogSize,
      "backups": config.logs.rotates,
      "category": "-"
    }
  },
  categories: {
    default: {appenders:['out', 'app'], level: config.logs.level}
  }
});

const logger = log4js.getLogger('-');

function info(string) {
  logger.info(string);
}

function warn(string) {
  logger.warn(string);
}

function error(string) {
  logger.error(string);
}

module.exports = {info, warn, error};