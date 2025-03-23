const dishModel = require("../models/dishModel");
const {randomUUID} = require("crypto");
const fs = require("fs").promises;
const path = require("path");


module.exports = {
	addDish,
	deleteDish,
	updateDish,
	getDishes,
};


async function addDish({newDish}){
	const doc = {
		dishId: randomUUID(),
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

	return dishModel.getDishes({query});
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
