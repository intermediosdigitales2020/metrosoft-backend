const sql = require("../services/db.js");

// constructor
const User = function(user) {
  this.id = user.id;
  this.nombre = user.nombre;
  this.correo = user.correo;
  this.contrasena = user.contrasena;
  this.id_cliente= user.id_cliente
  this.rol = user.rol;
  this.created_at = user.created_at;
  this.last_modified = user.last_modified;
};

User.loginUser = (newUser, result) => { 
  sql.query(`SELECT * FROM userTable WHERE correo = "${newUser}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });

 };
User.login = (newUser, result) => { 
  console.log(newUser)
  sql.query("INSERT INTO login SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Login: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });

 };


User.create = (newUser, result) => {
    console.log(newUser)
    sql.query("INSERT INTO userTable SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created User: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  User.findById = (id, result) => {
    sql.query(`SELECT * FROM userTable WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Usuario:", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

  User.getAll = (nombre, result) => {
    let query = "SELECT * FROM userTable";
  
    if (nombre) {
      query += ` WHERE nombre LIKE '%${nombre}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("clientes: ", res);
      result(null, res);
    });
  };


  module.exports = User;
