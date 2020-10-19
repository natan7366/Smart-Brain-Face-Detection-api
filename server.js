
const express = require ('express');
const bcrypt = require ('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
// Dependencies injection:
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const myDB = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
    // user : 'postgres',
    // password : 'test',
    // database : 'smart_brain_db'
  }
});

// myDB.select('*').from('users').then(data => {
// 	console.log(data);
// });

const app = express();

app.use(express.urlencoded({extended: false}));// instead of body-parser
app.use(express.json());
app.use(cors());

// my endpoints:
app.get ('/', (req, res) => { res.send('working!!!') } )
app.post ('/signin', (req, res) => { signin.handleSignin(req, res, myDB, bcrypt) } )
app.post('/register', (req, res) => { register.handleRegister(req, res, myDB, bcrypt) } )
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, myDB) } )
app.put('/image', (req, res) => { image.handleImage(req, res, myDB) })	
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })	


app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})
/*
The dwsign of our API should be in the following form:
--> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:id --> GET = user 
/image --> PUT = user 
*/