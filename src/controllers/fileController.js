import response from "../utils/response.js";


const fileController = {
	addDishImage,
}


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


export default fileController;
