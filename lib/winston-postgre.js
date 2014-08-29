var util = require('util');
var winston = require('winston');
var pg = require('pg');
var moment = require('moment-timezone');

var PostgreSQL = exports.PostgreSQL = function (options) {
  winston.Transport.call(this, options);

  options = options || {};

  this.name = 'postgresql';
  this.connectionString = options.connectionString || 'postgres://username:password@localhost/database';
  this.schema = options.schema || 'public';
  this.table = options.table || 'nodelogs';
  this.timezone = options.timezone || null;
}

 /**
  * @extends winston.Transport
  */
util.inherits(PostgreSQL, winston.Transport);

winston.transports.PostgreSQL = PostgreSQL;

PostgreSQL.prototype.name = 'postgresql';

PostgreSQL.prototype.log = function (level, msg, meta, callback) {
    if (this.silent) {
        return callback && callback(null, true);
    };

    var self = this;
    var currentDate = "";
    if (this.timezone) {
      currentDate = moment().tz(this.timezone).format('YYYY-MM-DD HH:mm:ss.SSS');
    } else {
      currentDate = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    }
    var sqlInsert = "INSERT INTO " + this.table + " (logdate, level, message) VALUES ('" + currentDate + "', '" + level + "', '" + msg + "');";
    var client = new pg.Client(this.connectionString);   

    client.connect(function (err) { 
      if (err) {
        self.emit('Error connecting to the database', err);
      }
      client.query(sqlInsert, function (err) {
        if (err) {
          self.emit('error', err);
        }
        client.end();
      });
      callback(null, true);
    });
};