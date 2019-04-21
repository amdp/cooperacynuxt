const mysql = require('mysql2')
const connection = mysql.createConnection({ host: 'localhost', user: 'cooperacy', password: 'c00p3r4t10n', database: 'coo' })

setInterval(function() {
  console.log("Pooling on the river..")
  var query1 = 'SELECT @cousers:=COUNT(`active`) FROM `coo`.`users`    WHERE `active` = "1";'
  var query2 = 'SELECT @ideas:=COUNT(`stage`)    FROM `coo`.`projects` WHERE `stage`  = "7";'
  var query3 = 'UPDATE `coo`.`projects` set collected = collected + 0.00002283105023 * @cousers / @ideas where stage = "7";'
  connection.query(query1,
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      console.log(err);
    }
  )
  connection.query(query2,
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      console.log(err);
    }
  )
  connection.query(query3,
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      console.log(err);
    }
  )
}, 1000);