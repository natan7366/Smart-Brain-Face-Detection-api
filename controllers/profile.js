const handleProfileGet = (req,res, myDB) => {
	const {id} = req.params;
	myDB.select('*').from('users').where({
		id: id
	})
	.then(user => {
		if(user.length){ //if there is a user = no empty array
			res.json(user[0]) // cause the user is saved in the form [{}]
		} else {
			res.status(400).json('not found')
		}
	})
	.catch(err=> res.status(400).json('not found'))
}

module.exports = {
	handleProfileGet: handleProfileGet
};