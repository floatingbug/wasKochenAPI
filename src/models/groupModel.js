const {getDB} = require("../config/db");


const groupModel = {
	addGroup,
	getGroups,
};


async function addGroup({doc}){
	try{
		const db = await getDB();
		return db.collection("groups").insertOne(doc);
	}
	catch(error){
		throw error;
	}
}

async function getGroups({query}){
	try{
		const db = await getDB();
		const cursor = await db.collection("groups").find(query);
		const groups = await cursor.toArray();
		console.log(groups);
		return groups;
	}
	catch(error){
		throw error;
	}
}

module.exports = groupModel;
