const response = require("../utils/response");


const fileController = {
	addDishImage,
};


async function addDishImage(req, res, next){
	response.successResponse({
		res,
		code: 200,
		message: "success",
		data: {
			filename: req.file.filename,
		}
	});
}


module.exports = fileController;
