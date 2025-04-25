const userModel = require("../models/userModel.js");
const weekPlanModel = require("../models/weekPlanModel");
const {randomUUID} = require("crypto");
const jwt = require("jsonwebtoken");
const weekPlanSchema = require("../data/weekPlanSchema");


const userService = {
	addUser,
	createToken,
};


async function addUser({name, mail, password}){
	let userId = "";
	const weekPlanId = randomUUID();
	
	if(name === "user" && password === "user"){
		userId = "1";
	}
	else {
		userId = randomUUID();
	}

	//check if email or name already exists
	try{
		const query = {
			$or: [
				{name},
				{mail},
			],
		};

		const result = await userModel.getUser({query});

		if(result){
			return {
				success: false,
				errors: ["User already exists."],
			};
		}
	}
	catch(error){
		throw error;
	}

	//add user to db
	try{
		const doc = {
			name,
			mail,
			password,
			userId,
			groupIds: [],
		};

		const result = await userModel.addUser({doc});
	}
	catch(error){
		throw error;
	}

	//add week plan
	try{
		const doc = {
			userId,
			weekPlanId,
			weekPlan: weekPlanSchema,
		};

		const result = await weekPlanModel.addWeekPlan({doc});

		return {
			success: true,
			code: 200,
			message: "User has been added.",
		};
	}
	catch(error){
		throw error;
	}
}

async function createToken({nameOrMail, password}){
	let user = null;
	
	//test user
	if(nameOrMail === "user" && password === "user"){

		return {
			success: true,
			message: "Token has been created.",
			code: 200,
			token: "1",
		};
	}

	//get user
	try{
		const query = {
			$or: [
				{
					name: nameOrMail,
					password,
				},
				{
					mail: nameOrMail,
					password
				},
			],
		};

		user = await userModel.getUser({query});
		if(!user){
			return {
				success: false,
				code: 400,
				errors: ["User not found."],
			};
		}

		delete user.password;
		delete user._id;
	}
	catch(error){
		throw error;
	}

	//create token
	try{
		const token = await new Promise((resolve, reject) => {
			jwt.sign(user, process.env.JWT_SECRET, (err, token) => {
				if(err) reject(err);
				else resolve(token);
			});
		});

		return {
			success: true,
			message: "Token has been created.",
			code: 200,
			token: `Bearer ${token}`,
		};
	}
	catch(error){
		throw error;
	}
}


module.exports = userService;
