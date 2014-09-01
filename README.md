winston-postgre
===============

A winston transporter for PostgreSQL database

Installation
------------

``` bash
npm install winston-postgre
```

Also, you need to have a table on your postgre database with the following structure:
``` sql
CREATE TABLE nodelogs
(
  logdate timestamp without time zone,
  level text,
  message text
);
```


Options
------------

* __connectionString:__ The PostgreSQL connection string.
* __schema:__ The schema which the table was created.
* __table:__ The table name inside the database under the schema.
* __level:__ The winston log level

See the default values used as example:
``` js
var options = {
  "connectionString" : "postgres://username:password@localhost/database",
  "schema" : "public", //default
  "table" : "nodelogs", //default
  "level" : "silly" //default level = info
};
```

Usage
------------

``` js
var winston = require('winston');
require('winston-postgre');

var options = {
  "connectionString" : "postgres://username:password@localhost/database",
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
```

Feel free to open an issue or do a pull request.


