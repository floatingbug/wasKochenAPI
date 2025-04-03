const weekPlanModel = require("../models/weekPlanModel");


const weekPlanService = {
	getWeekPlan,
	setWeekPlan,
}


async function getWeekPlan({user}){
	try{
		const query = {
			userId: user.userId,
		};

		const result = await weekPlanModel.getWeekPlan({query});

		return {
			success: true,
			code: 200,
			message: "Week Plan has been sent.",
			data: result,
		};
	}
	catch(error){
		throw error;
	}
}

async function setWeekPlan({weekPlan, userId}){
	try{
		const filter = {
			userId,
		};
		const updateDoc = {
			$set: {
				weekPlan: weekPlan,
			},
		};

		const result = await weekPlanModel.setWeekPlan({filter, updateDoc})

		return {
			success: true,
			code: 200,
			message: "Week plan has been set.",
		}
	}
	catch(error){
		throw error;
	}
}


module.exports = weekPlanService;
