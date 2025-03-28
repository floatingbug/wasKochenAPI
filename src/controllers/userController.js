const userService = require("../services/userService");
const response = require("../utils/response");


const userController = {
	addUser,
};


async function addUser(req, res, next){
	const {name, email, password} = req.body;

	try{
		const result = await userService.addUser({name, email, password});
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
			message: "User has been added",
		});
	}
	catch(error){
		next(error);
	}
}


module.exports = userController;
