const {getDB} = require("../config/db");


const weekPlanModel = {
	addWeekPlan,
	getWeekPlan,
	setWeekPlan,
}


async function addWeekPlan({doc}){
	try{
		const db = await getDB();
		const result = await db.collection("weekPlans").insertOne(doc);

		return result;
	}
	catch(error){
		throw error;
	}
}

async function getWeekPlan({query}){
	try{
		const db = await getDB();
		const result = await db.collection("weekPlans").findOne(query);

		return result;
	}
	catch(error){
		throw error;
	}
}

async function setWeekPlan({filter, updateDoc}){
	try{
		const db = await getDB();
		const result = await db.collection("weekPlans").updateOne(filter, updateDoc);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = weekPlanModel;
