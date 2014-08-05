var winston = require('winston');
var db = require('../lib/winston-postgre');


var options = {
  "connectionString" : "postgres://postgres:postgres@localhost/winstontest",
  "schema" : "public",
  "table" : "nodelogs",
  "level" : "silly"
};

winston.add(winston.transports.PostgreSQL, options);


winston.log('error', 'Just a simple error log');
winston.log('info', 'Just a simple info log');
winston.log('warn', 'Just a simple warn log');
winston.log('debug', 'Just a simple debug log');
winston.log('verbose', 'Just a simple verbose log');

