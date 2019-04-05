var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_willjohn',
  password        : '7028',
  database        : 'cs340_willjohn'
});

module.exports.pool = pool;
