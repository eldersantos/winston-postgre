var util = require('util');
var winston = require('winston');
var pg = require('pg');
var moment = require('moment');

var PostgreSQL = exports.PostgreSQL = function (options) {
  winston.Transport.call(this, options);

  options = options || {};

  this.name = 'postgresql';
  //this.connectionString = options.connectionString || 'Driver={SQL Server Native Client 11.0};Server=(local);Trusted_Connection=Yes;Database=winston';
  this.table = options.table || 'dbo.NodeLogs';
}

 /**
  * @extends winston.Transport
  */
util.inherits(PostgreSQL, winston.Transport);

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

    var query = 'INSERT INTO ' + this.table + ' (LogDate, Level, Message) VALUES (?, ?, ?)';
    var values = [currentDate, level, msg];
    sql.queryRaw(this.connectionString, query, values, function(err, results) {
    if (err) {
      self.emit('error', err);
    }
    if (!results) {
      self.emit('error', 'results not set');
    }
    if (!results.rowcount) {
      self.emit('error', 'rowcount not set');
    }

    self.emit('logged', results.rowcount);
    callback(null, true);
  });
};