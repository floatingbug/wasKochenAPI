const dishService = require("../services/dishService");
const response = require("../utils/response");


module.exports = {
	addDish,
	deleteDish,
	updateDish,
	getDishes,
};

async function addDish(req, res, next){
	const {newDish} = req.body;

	try{
		const storedDish = await dishService.addDish({newDish});
		if(!storedDish){
			response.errorResponse({
				res,
				code: 400,
				errors: ["Fail to add dish."],
			});

			return;
		}

		response.successResponse({
			res,
			code: 200,
			message: "dish has been added.",
			data: {
				dish: storedDish,
			}
		});
	}
	catch(error){
		next(error);
	}
};

async function getDishes(req, res, next){
	const queries = req.query;

	try{
		const dishes = await dishService.getDishes({queries});

		if(!dishes || dishes.length === 0){
			response.errorResponse({
				res,
				code: 400,
				errors: ["No dishes found."],
			});

			return;
		}

		response.successResponse({
			res,
			code: 200,
			data: {
				dishes,
			}
		});
	}
	catch(error){
		next(error);
	}
}

async function deleteDish(req, res, next){
	const {dishId} = req.body;
	
	try{
		const result = await dishService.deleteDish({dishId});
		if(!result.success){
			response.errorResponse({
				res,
				code: 400,
				errors: result.errors,
			});

			return;
		}

		response.successResponse({
			res,
			code: 200,
			message: "Dish has been removed.",
		});
	}
	catch(error){
		next(error);
	}
}

async function updateDish(req, res, next){
	const {dishId, updateProperty, update} = req.body;

	try{
		const result = await dishService.updateDish({dishId, updateProperty, update});
		
		if(result.modifiedCount === 0){
			response.errorResponse({
				res,
				code: 400,
				errors: ["Fail to update dish."],
			});

			return;
		}

		response.successResponse({
			res,
			code: 200,
			message: "dish has been updated.",
		});
	}
	catch(error){
		next(error);
	}
}
