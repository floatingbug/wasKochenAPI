const response = require("../utils/response");
const weekPlanService = require("../services/weekPlanService");


const weekPlanController = {
	getWeekPlan,
	setWeekPlan,
};


async function getWeekPlan(req, res, next){
	try{
		const result = await weekPlanService.getWeekPlan({user: req.user});

		if(!result.success){
			response.errorResponse({
				res,
				code: result.code,
				errors: result.errors,
			});
		}

		response.successResponse({
			res,
			code: result.code,
			message: result.message,
			data: result.data,
		});
	}
	catch(error){
		next(error);
	}
}

async function setWeekPlan(req, res, next){
	try{
		const result = await weekPlanService.setWeekPlan({weekPlan: req.body, userId: req.user.userId});

		response.successResponse({
			res,
			code: result.code,
			message: result.message,
		});
	}
	catch(errro){
		next(error);
	}
}


module.exports = weekPlanController;
