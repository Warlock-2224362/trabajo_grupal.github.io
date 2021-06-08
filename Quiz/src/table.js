var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "quiz_db"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE usuarios (Nombre VARCHAR(60), Correo VARCHAR(60), Celular INT(60))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });