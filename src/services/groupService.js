const groupModel = require("../models/groupModel");
const {randomUUID} = require("crypto");


const groupService = {
	createGroup,
	getGroups,
}


async function createGroup({name, user}){
	const groupId = randomUUID();

	try{
		const doc = {
			name,
			groupId,
			creatorName: user.name,
			creatorId: user.userId,
			memberIds: [user.userId],
			dishIds: [],
			messages: [],
			mealPlan: {
				"monday": [],
				"tuesday": [],
				"wednesday": [],
				"thursday": [],
				"friday": [],
				"saturday": [],
				"sunday": []
			},
		};

		const result = await groupModel.addGroup({doc});

		return {
			code: 200,
			message: "Group has been created.",
			groupId,
		}
	}
	catch(error){
		throw error;
	}
}

async function getGroups({userId}){
	try{
		const query = {
			memberIds: {
				$in: [userId],
			},
		};

		const result = await groupModel.getGroups({query});
		return {
			success: true,
			code: 200,
			message: "Groups has been retrieved.",
			groups: result,
		};
	}
	catch(error){
		throw error;
	}
}




module.exports = groupService;
