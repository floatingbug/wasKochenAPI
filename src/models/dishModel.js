import {getDB} from "../config/db.js";


export default {
	addDish,
	getDishes,
	deleteDish,
	updateDish,
};


async function addDish({doc}){
	const db = await getDB();
	return db.collection("dishes").insertOne(doc);
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
