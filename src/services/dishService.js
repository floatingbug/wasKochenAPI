const dishModel = require("../models/dishModel");
const {randomUUID} = require("crypto");
const fs = require("fs").promises;
const path = require("path");


module.exports = {
	addDish,
	deleteDish,
	updateDish,
	getDishes,
	getDishById,
};


async function addDish({newDish}){
	const doc = {
		dishId: randomUUID(),
		timestamp: Date.now(),
		rating: 0,
		dish: newDish,
	};

	const result = await dishModel.addDish({doc});
	if(!result || !result.acknowledged) return false;
	return doc;
}

async function deleteDish({dishId}){
	try{
		//delete image
		const fetchedDish = await dishModel.getDishById({dishId});

		if(!fetchedDish){
			return {
				success: false,
				errors: [`Fail to delete dish with dishId: ${dishId}`],
			};
		}

		const filePath = process.cwd() + fetchedDish.dish.dishImageUrl;
		console.log(filePath);
		const fileExists = await fs.stat(filePath).then(() => true).catch(() => false);

		if(fileExists){
			await fs.unlink(filePath);
		}

	
		//delete dish
		const doc = {dishId};
		const result = await dishModel.deleteDish({doc});
		
		if(result.deletedCount === 0){
			return {
				success: false,
				errors: ["Fail to delete dish."],
			}
		}

		return {
			success: true,
		};
	}
	catch(error){
		throw error;
	}
}

async function getDishes({queries}){
	let query = {};
	let filter = {};

	//create query
	if(queries.categories){
		const categories = queries.categories.split(",").map(categorie => categorie.trim());
		query["dish.categories"] = {
			"$all": categories,
		};
	}
	if(queries.kilocalories){
		const [min, max] = queries.kilocalories.split("-").map(n => Number(n));

		query["dish.kilocalories"] = {
			$gte: min,
			$lte: max,
		}
	}
	if(queries.recipeName){
		query["dish.recipeName"] = {
			$regex: queries.recipeName,
			$options: "i",
		};
	}
	if(queries.preparationTime){
		query["dish.preparationTime"] = {
			$lte: Number(queries.preparationTime),
		}
	}
	if(queries.difficulty){
		query["dish.difficulty"] = {
			$gte: Number(queries.difficulty),
		}
	}
	if(queries.portions){
		query["dish.portions"] = {
			$gte: Number(queries.portions),
		}
	}

	//create filter
	if(queries.sort){
		let [name, value] = queries.sort.split("-");
		if(value === "descending") value = -1;
		else if(value === "ascending") value = 1;
		filter.sort = {
			name,
			value,
		}
	}
	if(queries.limit){
		filter.limit = Number(queries.limit);
	}

	try{
		const result = await dishModel.getDishes({query, filter});

		if(queries.random && queries.random < result.length){
			let indexes = new Set();
			let dishes = [];

			while (indexes.size < queries.random) {
				indexes.add(Math.floor(Math.random() * result.length));
			}

			for(let index of indexes){
				dishes.push(result[index])
			}

			return dishes;
		}

		return result;
	}
	catch(error){
		throw error;
	}
}

async function getDishById({dishId}){
	try{
		const query = {
			dishId,
		};

		const result = await dishModel.getDishById({query});

		return {
			success: true,
			code: 200,
			message: "Dish has been sent.",
			dish: result.dish,
		};
	}
	catch(error){
		throw error;
	}
}

async function updateDish({dishId, updateProperty, update}){
	const filter = {
		dishId,
	};

	const updateDoc = {
		$set: {
			[`dish.${updateProperty}`]: update,
		},
	};


	return dishModel.updateDish({filter, updateDoc});
}
