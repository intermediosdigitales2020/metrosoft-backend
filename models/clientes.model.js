const sql = require("../services/db.js");


//Constructor
const Cliente = function(cliente) {
    this.id = cliente.id;
    this.nombre = cliente.nombre;
    this.correo = cliente.correo;
    this.rol = cliente.rol;
    this.telefono = cliente.telefono;
    this.nit = cliente.nit
    this.created_at = cliente.created_at;
    this.last_modified = cliente.last_modified;
  };

  Cliente.create = (newClient, result) => {
    sql.query("INSERT INTO clientes SET ?", newClient, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created Cliente: ", { id: res.insertId, ...newClient });
      result(null, { id: res.insertId, ...newClient });
    });
  };

  
Cliente.findById = (id, result) => {
    sql.query(`SELECT * FROM clientes WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Cliente: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Cliente with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  Cliente.getAll = (nombre, result) => {
    let query = "SELECT * FROM clientes";
  
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
  

  Cliente.updateById = (id, cliente, result) => {
    sql.query(
      "UPDATE clientes SET nombre = ?, correo = ?, rol = ?, telefono = ?, nit = ?, created_at = ?, last_modified = ? WHERE id = ?",
    [
        cliente.nombre,
        cliente.correo,
        cliente.rol,
        cliente.telefono,
        cliente.nit,
        cliente.created_at,
        cliente.last_modified = new Date(),
        id
    ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Cliente with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated Cliente: ", { id: id, ...Cliente });
        result(null, { id: id, ...Cliente });
      }
    );
  };
  
  Cliente.remove = (id, result) => {
    sql.query("DELETE FROM clientes WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Cliente with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Cliente with id: ", id);
      result(null, res);
    });
  };
  
  Cliente.removeAll = result => {
    sql.query("DELETE FROM clientes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} clientes`);
      result(null, res);
    });
  };
  module.exports = Cliente;
  