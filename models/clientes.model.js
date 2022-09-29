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
  
  
  Cliente.getAll = (title, result) => {
    let query = "SELECT * FROM clientes";
  
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
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
  
  Cliente.getAllPublished = result => {
    sql.query("SELECT * FROM clientes WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("clientes: ", res);
      result(null, res);
    });
  };
  
  Cliente.updateById = (id, Cliente, result) => {
    sql.query(
      "UPDATE clientes SET title = ?, description = ?, published = ? WHERE id = ?",
      [Cliente.title, Cliente.description, Cliente.published, id],
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
  