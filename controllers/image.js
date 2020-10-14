const Clarifai = require ('clarifai');

const app = new Clarifai.App({
 apiKey: '980c9ca1c2814375934f00c3a1e017e5'
});

const handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input) /*the url*/
  .then(data => {
    console.log(data)
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage =  (req,res, myDB) => { 
	const {id} = req.body;
	myDB('users').where('id', '=', id)
  		.increment('entries', 1)
  		.returning('entries')
  		.then(entries => {
  			// console.log(entries);
  			res.json(entries[0])
  		}) 
  		.catch(err=>res.status(400).json('unable getting entries'))
}

module.exports = {
	handleImage,
  handleApiCall
}