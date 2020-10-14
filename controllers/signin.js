const handleSignin =  (req, res, myDB, bcrypt)=>{	
	const {email, password} = req.body;
	if (!email || !password){
		 return res.status(400).json('incorrect form submission');
	}
	myDB.select('email', 'hash').from('login')
		.where('email', '=', email )
		.then(data => {
			// console.log(data)
			const isValid = bcrypt.compareSync(password, data[0].hash); 
			if (isValid) {
				return myDB.select('*').from('users')
				.where('email', '=', email)
				.then(user => {
					// console.log(user[0]);
					res.json(user[0])
				})
				.catch(err => res.status(400).json('unable to get usaer'))
			}else {
				res.status(400).json('wrong password')
			}
		})
		.catch(err => res.status(400).json('wrong email'))
}

module.exports = {
	handleSignin: handleSignin
};