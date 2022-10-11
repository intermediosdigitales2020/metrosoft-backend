module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const clientes = require("../controllers/clientes.controller.js");
    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();
  
//Crear nuevo tutorial
    router.post("/creartutorial", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/tutoriales", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
 
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    //Clientes
    router.post("/crearcliente", clientes.create);
    router.get("/clientes", clientes.findAll);

    //USUARIOS
    router.post("/crearuser", users.create);
    router.post("/login", users.login);

    router.get("/usuarios", users.findAll);
    router.get("/usuarios/:id", users.findOne);
    router.get("/usuarios/cliente/:id", users.findbyclient);





  
  
    app.use('/api', router);
  };