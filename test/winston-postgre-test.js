var winston = require('winston');
var db = require('../lib/winston-postgre');


var options = {
  "connectionString" : "postgres://postgres:$skido10@localhost/teste",
  "schema" : "public",
  "table" : "nodelogs",
  "createTable" : true
};

winston.add(winston.transports.PostgreSQL, options);


winston.log('error', 'Just a simple test2');

