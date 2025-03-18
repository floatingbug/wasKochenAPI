import dishModel from "../models/dishModel.js";
import {randomUUID} from "crypto";


export default {
	addDish,
	deleteDish,
	updateDish,
	getDishes,
}


async function addDish({newDish}){
	const doc = {
		dishId: randomUUID(),
		dish: newDish,
	};

	return dishModel.addDish({doc});
}

async function getDishes({queries}){
	let query = {};

	if(queries.categories){
		const categories = queries.categories.split(",").map(categorie => categorie.trim());
		query["dish.categories"] = {
			"$all": categories,
		};
	}

	console.log(query);

	return dishModel.getDishes({query});
}

async function deleteDish({dishId}){
	const doc = {
		dishId,
	};

	return dishModel.deleteDish({doc});
}

async function updateDish({dishId, update}){
	const filter = {
		dishId,
	};

	const updateFields = Object.keys(update).reduce((accumulator, key) => {
		accumulator[`dish.${key}`] = update[key];
		return accumulator;
	}, {});

	const updateDoc = {
		$set: updateFields,
	};

	return dishModel.updateDish({filter, updateDoc});
}
