export default {
	successResponse,
	errorResponse,
};


function successResponse({res, message, code, data}){
	res.status(code).json({success: true, message, data});
}

function errorResponse({res, errors, code}){
	res.status(code).json({success: false, errors});
}
