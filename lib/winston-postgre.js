var utility = require('util');
var winston = require('winston');
var pg = require('pg');
var moment = require('moment');

var PostgreSQL = exports.PostgreSQL = function (options) {
  winston.Transport.call(this, options);

  options = options || {};

  this.name = 'postgresql';
  this.connectionString = options.connectionString || 'postgres://username:password@localhost/database';
  this.schema = options.schema || 'public';
  this.table = options.table || 'NodeLogs';
}

 /**
  * @extends winston.Transport
  */
utility.inherits(PostgreSQL, winston.Transport);

/**
* Define a getter so that `winston.transports.SQLServer`
* is available and thus backwards compatible.
*/
winston.transports.PostgreSQL = PostgreSQL;

 /**
  * Expose the name of this transport on the prototype
  */
PostgreSQL.prototype.name = 'postgresql';

PostgreSQL.prototype.log = function (level, msg, meta, callback) {
    if (this.silent) {
        return callback && callback(null, true);
    };

    var self = this;

    var currentDate = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

    var client = new pg.Client(this.connectionString);

    client.query('INSERT INTO ' + this.table + ' (LogDate, Level, Message) VALUES (?, ?, ?)', [currentDate, level, msg], function (err, results) {
      if (err) {
        self.emit('error', err);
      }
      if (!results) {
        self.emit('error', 'results not set');
      }
    });

    self.emit('logged');
    callback(null, true);
};