const response = require("../utils/response");
const groupService = require("../services/groupService");


const groupController = {
	createGroup,
	getGroups,
};


async function createGroup(req, res, next){
	const {name} = req.body;

	try{
		const result = await groupService.createGroup({
			name,
			user: req.user,
		});

		response.successResponse({
			res,
			code: result.code,
			message: result.message,
			data: {
				groupId: result.groupId,
			},
		});
	}
	catch(error){
		next(error);
	}
}

async function getGroups(req, res, next){
	try{
		const result = await groupService.getGroups({
			userId: 
			req.user.userId
		});
		
		response.successResponse({
			res,
			code: result.code,
			message: result.message,
			data: {
				groups: result.groups,
			},
		});
	}
	catch(error){
		next(error);
	}
}


module.exports = groupController;
