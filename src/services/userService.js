const userModel = require("../models/userModel.js");
const {randomUUID} = require("crypto");
const jwt = require("jsonwebtoken");


const userService = {
	addUser,
	createToken,
};


async function addUser({name, mail, password}){
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
			userId: randomUUID(),
			groupIds: [],
		};

		const result = await userModel.addUser({doc});

		return {
			success: true,
			message: "User has been added.",
		};
	}
	catch(error){
		throw error;
	}
}

async function createToken({nameOrMail, password}){
	let user = null;

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
