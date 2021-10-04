const {MongoClient} = require('mongodb');
let entrenador3 ={  
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


async function main(){
	const url = 'mongodb://localhost/pokemon';

	const client = new MongoClient(url);

	try{
		await client.connect();

		await insert(client, entrenador3);

		await find(client,3);

		await update(client, 3, {"caja": {
			"_id": 4,
			"pokemones": [
			  12,
			  22,
			  32,
			  42
			]
	  }}) 

	    await find(client,3);

		await deleteOne(client, 3);

		await find(client,3);


	}catch (e){
		console.error(e);
	}finally {
		await client.close();
	}

}

main().catch(console.error);

async function insert(client, newEntrenador){
	const result = await client.db("pokemon").collection("entrenador").insertOne(newEntrenador);

	console.log(`Nuevo entretador id: ${result.insertedId}`);
}

async function find(client, id) {
	const result = await client.db("pokemon").collection("entrenador").findOne({_id:id});

	if(result){
		console.log(result);
	}else{
		console.log('No encontrado');
	}
}

async function update(client, id, updateEntrador) {
	const result = await client.db("pokemon").collection("entrenador").updateOne({_id:id}, { $set:updateEntrador})
	console.log(`${result.modifiedCount} Modificaciones`)
}

async function deleteOne(client, id) {
	const result = await client.db("pokemon").collection("entrenador").deleteOne({_id:id})
	console.log(`${result.deletedCount} Eliminados`)
}
