const {getDB} = require("../config/db");


const userModel = {
	addUser,
	getUser,
};


async function addUser({doc}){
	try{
		const db = await getDB();
		const result = await db.collection("users").insertOne(doc);
		return result;
	}
	catch(error){
		throw error;
	}
}

async function getUser({query}){
	try{
		const db = await getDB();
		const result = await db.collection("users").findOne(query);
		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = userModel;
