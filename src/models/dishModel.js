const {getDB} = require("../config/db.js");


module.exports = {
	addDish,
	getDishes,
	getDishById,
	deleteDish,
	updateDish,
};


async function addDish({doc}){
	const db = await getDB();
	return db.collection("dishes").insertOne(doc);
}

async function getDishById({query}){
	const db = await getDB();
	return db.collection("dishes").findOne(query);
}

async function getDishes({query}){
	const db = await getDB();
	const result = db.collection("dishes").find(query);
	return result.toArray();
}

async function deleteDish({doc}){
	const db = await getDB();
	return db.collection("dishes").deleteOne(doc);
}

async function updateDish({filter, updateDoc}){
	const db = await getDB();
	return db.collection("dishes").updateOne(filter, updateDoc);
}
