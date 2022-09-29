const Cliente = require("../models/clientes.model.js");


// Create and Save a new Cliente
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Cliente
      const cliente = new Cliente({
        id: req.body.id,
        nombre: req.body.nombre,
        correo: req.body.correo,
        rol: req.body.rol,
        telefono: req.body.telefono,
        nit: req.body.nit,
        created_at: new Date(),
        last_modified: new Date()
      });
    
      // Save Cliente in the database
      Cliente.create(cliente, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some errorfff occurred while creating the cliente."
          });
        else res.send(data);
      });
    };
    