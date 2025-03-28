const userService = {
	addUser,
};


async function addUser({name, email, password}){
	try{
		const doc = {
			name,
			email,
			password,
		}
		const result = await addUser(doc);
	}
}


module.exports = userService;
