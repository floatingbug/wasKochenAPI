import dishService from "../services/dishService.js";
import response from "../utils/response.js";


export default {
	addDish,
	deleteDish,
	updateDish,
	getDishes,
}

async function addDish(req, res, next){
	const {newDish} = req.body;

	try{
		const result = await dishService.addDish({newDish});
		if(!result || !result.acknowledged){
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
	catch(errro){
		next(error);
	}
}

async function deleteDish(req, res, next){
	const {dishId} = req.body;

	try{
		const result = await dishService.deleteDish({dishId});
		
		if(result.modifiedCount === 0){
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
		});
	}
	catch(error){
		next(error);
	}
}

async function updateDish(req, res, next){
	const {dishId, update} = req.body;

	try{
		const result = await dishService.updateDish({dishId, update});
		
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
