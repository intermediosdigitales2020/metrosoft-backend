module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const clientes = require("../controllers/clientes.controller.js");

    var router = require("express").Router();
  
//Crear nuevo tutorial
    router.post("/creartutorial", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/tutoriales", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    //Crear nuevo tutorial
    router.post("/crearcliente", clientes.create);

    router.get("/clientes", clientes.findAll);

  
  
    app.use('/api', router);
  };