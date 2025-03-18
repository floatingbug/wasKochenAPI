import {MongoClient} from "mongodb";


const client = new MongoClient(process.env.MONGO_URL);
let db = null;


async function connectDB(){
	try{
		await client.connect();
		db = client.db("wasKochen");
		console.log("App connected to DB");
	}
	catch(error){
		console.log("App could'nt connect to DB: ", error);
		process.exit(1);
	}
}

async function getDB(){
	if(!db){
		try{
			await client.connect();
			db = client.db("wasKochen");
		}
		catch(error){
			console.log("App has lost connection to DB: ", error);
			process.exit(1);
		}
	}

	return db;
}


export {connectDB, getDB};
