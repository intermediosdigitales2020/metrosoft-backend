const User = require("../models/users.model.js");
const bcrypt = require("bcrypt")



// Create and Save a new Cliente
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Cliente
      let cifrado = ''
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.contrasena, salt, function(err, hash) {
             cifrado = hash
             console.log(hash)
             
      const user = new User({
        id: req.body.id,
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasena: cifrado,
        rol: req.body.rol,
        id_cliente: req.body.id_cliente,
        created_at: new Date(),
        last_modified: new Date()
      });

    
      // Save Cliente in the database
      User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some errorfff occurred while creating the cliente."
          });
        else res.send(data);
      });
        });
    })
      
    };

  exports.login = async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
   

    const plaintextPassword = req.body.contrasena
    const correo = req.body.correo
  
    console.log(correo)

    User.loginUser(req.body.correo, (err, data) => {

      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No encontramos ningun correo asociado ${req.body.correo}.`
          });
        } else {
          res.status(500).send({
            message: "Intentalo de nuevo | Hubo un error en el login asociado con" + req.body.correo
          });
        }
      } else{
        const contrasena = data.contrasena
        bcrypt.compare(plaintextPassword, contrasena, function(err, result) {
          if (result) {
             // password is valid
             console.log("Contrasena valida")
               // Save Cliente in the database
               const login = {
                id_usuario: data.id,
                correo: req.body.correo,
                date: new Date()
              }
          User.login(login, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Error en el login | Intentar De nuevo"
              });
            else res.send(data);
          });
         }
      });
      }
    });
  };

  exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Ningun usuario asociado al id: ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error obteniendo el usuario con el id:" + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.findbyclient = (req, res) => {

    User.findbyclient(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Ningun usuario asociado al cliente con el id: ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error obteniendo usuarios al cliente id:" + req.params.id
          });
        }
      } else res.send(data);
    });
  };