const userService = require("../services/userService");
const response = require("../utils/response");


const userController = {
	addUser,
	createToken,
	getUser,
};


async function addUser(req, res, next){
	const {name, mail, password} = req.body;

	console.log(name, mail, password);

	try{
		const result = await userService.addUser({name, mail, password});
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
			message: result.message,
		});
	}
	catch(error){
		next(error);
	}
}

async function createToken(req, res, next){
	const {nameOrMail, password} = req.body;

	try{
		const result = await userService.createToken({nameOrMail, password})

		if(!result.success){
			response.errorResponse({
				res,
				code: result.code,
				errors: result.errors,
			});

			return;
		}

		response.successResponse({
			res,
			code: result.code,
			message: result.message,
			data: {
				token: result.token,
			},
		});
	}
	catch(error){
		next(error);
	}
}

async function getUser(req, res, next){
	response.successResponse({
		res,
		code: 200,
		message: "User has been sendet.",
		data: {
			user: req.user,
		}
	});
}


module.exports = userController;
