const express = require('express')
const winston = require("winston");
const jwt = require("jsonwebtoken");
const secret = "secret";
const user = process.argv[2];
const payload = { user };
const app = express();
app.use(express.json());
app.use(express.json());
app.use(express.static("./public"));
const { MongoClient, Logger } = require('mongodb');
const { cli } = require('winston/lib/winston/config');
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

let entrenador = {
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
  "equipo": {
    "_id": 3,
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

app.post("/signup", (req, res) => {

  client.connect();
  const { email, password } = req.body;

  let entrenadorNew = {

    "email": email,
    "password": password,
    "pokemones": []
  }

  try {

    insertar(client, entrenadorNew);

    res.status(201).json(entrenadorNew);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }

  function insertar(client, newEntrenador) {
    const result = client.db("pokemon").collection("entrenador").insertOne(newEntrenador);
    return result;
  }
})

app.post("/signin", (req, res) => {

  client.connect();
  const { email, password } = req.body;

  try {
    find(client, email, password);
  } catch (error) {
    res.status(500);
  }

  function find(client, email, password) {
    const result = client.db("pokemon").collection("entrenador").findOne({ "email": email, "password": password }, function(err, result){
      if (err) throw err;
      
      if(result != null){

        const token = jwt.sign(payload, secret, {
          issuer: "logged",
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });

      }else{

        res.status(500).json("Email or passwords incorrects");

      }

      
    });

    return result;
  }

})


app.get('/me',verifyToken, function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    res.status(200).send(decoded);
  });
});


app.get("/obtenerEntrenador:id", (req, res) => {
  client.connect();
  async function obtener(client, id) {
    const idnew = parseInt(+"" + req.params.id);
    console.log(idnew);
    const result = client.db("pokemon").collection("entrenador").findOne({ _id: idnew });
    return result;
  }
  async function func() {
    try {
      let result = await obtener(client, 3);
      res.status(201).json(result);
      console.log(result)
    } catch (error) {
      res.send("Problemas para encontrar");
    }
  }
  func();
});

app.post("/insertarEntrenador", verifyToken, (req, res) => {
  client.connect();
  function insertar(client, newEntrenador) {
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
  req.body
  insertar(client, req.body)
  res.status(201).json(req.body);
});

app.put("/actualizarEntrenador:id", verifyToken, (req, res) => {
  client.connect();
  const idnew = parseInt(+"" + req.params.id);
  async function actualizar(client, id, newEntrenador) {
    const result = await client.db("pokemon").collection("entrenador").updateOne({ _id: id }, { $set: newEntrenador })
    return result;
  }
  async function func() {
    let result = await actualizar(client, idnew, entrenador2)
    res.status(201).json(result);
  }
  func()

});

app.delete("/eliminarEntrenador:id", (req, res) => {
  client.connect();
  function eliminar(client, id) {
    const idnew = parseInt(+"" + req.params.id);
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

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, secret, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

