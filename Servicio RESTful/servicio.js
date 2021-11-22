const express = require('express')
const winston = require("winston");
const app = express();
app.use(express.json());
const bodyParse = require('body-parser');
app.use(express.json());
app.use(express.static("./public"));
const {MongoClient, Logger} = require('mongodb');
const url = 'mongodb://localhost/pokemon';
const client = new MongoClient(url);
const logger = winston.createLogger({
    level: "warn",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: "logs.txt"
        })
    ]
});

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

let entrenador2 = {
    "_id": 3,
    "nombre": "Pepe",
    "email": "pepe@gmail.com",
    "password": "123456",
    "caja": {
        "_id": 3,
        "pokemones": [
            12,
            22,
            32,
            42
        ]
    },
    "equipo": {
        "_id": 3,
        "pokemones": [
            12,
            42
        ]

    }

}





app.get("/obtenerEntrenador:id", (req, res) => {
  client.connect();
  async function obtener(client, id) {
      const idnew = parseInt(+""+req.params.id);
      const result = client.db("pokemon").collection("entrenador").findOne({ _id: idnew });
      return result;
  }
  async function func(){
  try {
      let result = await obtener(client, 3)
      res.status(201).json(result);
      console.log(result)
  } catch (error) {
      res.send("Problemas para encontrar");
  }
 }
 func()
  });
  
app.post("/insertarEntrenador", (req, res) => {
    client.connect();
      function insertar(client, newEntrenador){
      const result = client.db("pokemon").collection("entrenador").insertOne(newEntrenador);
      return result;
    }
      insertar(client, entrenador)
    res.status(201).json(entrenador);
});

app.post("/insertarEntrenador2", (req, res) => {
    client.connect();
    function insertar(client, newEntrenador) {
        const result = client.db("pokemon").collection("entrenador").insertOne(newEntrenador);
        return result;
    }
    insertar(client, entrenador2)
    res.status(201).json(entrenador2);
});
  
  app.put("/actualizarEntrenador:id", (req, res) => {
    client.connect();
    const idnew = parseInt(+""+req.params.id);
    async function actualizar(client,id , newEntrenador){     
      const result = await client.db("pokemon").collection("entrenador").updateOne({_id:id}, { $set:newEntrenador})
      return result;
    }
    async function func(){
    let result = await actualizar(client, idnew, entrenador2)
    res.status(201).json(result);
    }
    func()

  });
  
app.delete("/eliminarEntrenador:id", (req, res) => {
    client.connect();
    function eliminar(client, id) {
        const idnew = parseInt(+""+req.params.id);
        const result = client.db("pokemon").collection("entrenador").deleteOne({ _id: idnew });
        return result;
    }
    try {
        eliminar(client, req.params.id);
        res.send(`Eliminado ${req.params.id}`);
    } catch (error) {
        res.send("Problemas para eliminar");
    }
    
    
  });

  
  app.listen(3000, (err) => {
    console.log('PokeServidor')
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });

