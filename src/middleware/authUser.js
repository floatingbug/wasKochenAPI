const jwt = require("jsonwebtoken");
const response = require("../utils/response");


async function authUser(req, res, next){

	const authHeader = req.headers["authorization"];
	if(!authHeader) {
		response.errorResponse({
			res,
			code: 400,
			errors: ["No JWT supported."],
		});

		return;
	}

	const token = authHeader.split(" ")[1];

	try{
		const user = await new Promise((resolve, reject) => {
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if(err) reject(err);
				else resolve(decoded)
			});
		});

		req.user = user;

		next();
	}
	catch(error){
		response.errorResponse({
			res,
			code: 500,
			errors: ["Internal Server Error", "Fail to decode token"],
		});

		return;
	}
}


module.exports = authUser;
