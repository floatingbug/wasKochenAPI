const dishService = require("../services/dishService");
const response = require("../utils/response");


module.exports = {
	addDish,
	deleteDish,
	updateDish,
	getDishes,
	getDishById,
	getOwnDishes,
};

async function addDish(req, res, next){
	const {newDish} = req.body;
	const userId = req.user.userId;

	try{
		const storedDish = await dishService.addDish({userId, newDish});
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

async function getDishById(req, res, next){
	const dishId = req.query.dishId;

	try{
		const result = await dishService.getDishById({dishId});

		response.successResponse({
			res,
			code: result.code,
			message: result.message,
			data: {
				dish: result.dish,
			},
		});
	}
	catch(error){
		next(error);
	}
}

async function getOwnDishes(req, res, next){
	const userId = req.user.userId;
	console.log("test");
	
	try{
		const result = await dishService.getOwnDishes({userId});
		
		response.successResponse({
			res,
			code: result.code,
			message: result.message,
			data: {
				dishes: result.dishes,
			},
		});
		console.log("test", result);

		return;
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
	const userId = req.user.userId;

	try{
		const result = await dishService.updateDish({userId, dishId, updateProperty, update});

		
		if(!result || result.modifiedCount === 0){
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
