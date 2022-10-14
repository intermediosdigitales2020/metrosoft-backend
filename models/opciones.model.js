const sql = require("../services/db.js");

// constructor
const Opciones = function(opcion) {
  this.id = opcion.id;
  this.id_rol = opcion.id_rol;
  this.configuracion = opcion.configuracion;
  this.conf_icn = opcion.conf_icn;
  this.informes= opcion.informes
  this.equipos = opcion.equipos;
  this.equ_icn = opcion.equ_icn;
  this.sedes = opcion.sedes;
  this.sed_icn= opcion.sed_icn
  this.usuarios = opcion.usuarios;
  this.usu_icn = opcion.usu_icn;
  this.calendario = opcion.calendario 
  this.cal_icn = opcion.cal_icn;
  this.mantenimiento = opcion.mantenimiento;
  this.mant_icn = opcion.mant_icn;
  this.metrosoft = opcion.metrosoft 
  this.metr_icn = opcion.metr_icn;
  this.licencias = opcion.licencias;
  this.lic_icn = opcion.lic_icn;
};

Opciones.create = (newUser, result) => {
    console.log(newUser)
    sql.query("INSERT INTO opciones SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Opcion Creada: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  module.exports = Opciones;
