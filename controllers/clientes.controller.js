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

    // Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Cliente.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Cliente."
        });
      else res.send(data);
    });
  };

  exports.findAllPublished = (req, res) => {
    Cliente.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
   // Validate Request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Cliente.updateById(
    req.params.id,
    new Cliente(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Cliente.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Tutorial with id " + req.params.id
            });
          }
        } else res.send({ message: `Tutorial was deleted successfully!` });
      });
    };
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Cliente.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        else res.send({ message: `All Tutorials were deleted successfully!` });
      });
    };
    