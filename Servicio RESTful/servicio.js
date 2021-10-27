const express = require('express')
const app = express();
app.use(express.json());
const bodyParse = require('body-parser');
app.use(express.json());
app.use(express.static("./public"));
const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost/pokemon';
const client = new MongoClient(url);

let entrenador ={  
  "_id": 3,
  "nombre": "Juan",
  "email": "algo2@gmail.com",
  "password": "4234567",
  "caja": {
    "_id": 3,
    "pokemones": [
    12,
    22,
    32,
    42
    ]
  },
  "equipo":{
    "_id" : 3,
    "pokemones": [
      12,
      42
    ]
    
  }
  
  }





app.get("/obtenerEntrenador:id", (req, res) => {
  
    let id = req.params.id;
    entranador.id = id;
    var dummy = JSON.stringify(entranador)
    let entre = dummy
    res.status(201).json(entre);
  });
  
  app.post("/insertarEntrenador", (req, res) => {
      function insertar(client, newEntrenador){
      client.connect();
      const result = client.db("pokemon").collection("entrenador").insertOne(newEntrenador);
      return result;
    }
    insertar(client, entrenador)
    res.status(201).json(entrenador);
  });
  
  app.put("/actualizarEntrenador:id", (req, res) => {
    let id = req.params.id;
    entranador.id = id;
    var dummy = JSON.stringify(entranador)
    let entre = dummy
    res.status(201).json(entre);
  });
  
  app.delete("/eliminarEntrenador:id", (req, res) => {
    res.send(`Eliminado ${req.params.id}`);
  });

  
  app.listen(3000, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });

