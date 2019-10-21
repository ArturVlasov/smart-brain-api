const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const saltRounds = 10;

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'artur',
		password: '',
		database: 'smart-brain'
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt,saltRounds)} )
app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)})
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})

/*
API DESIGN

/--> res = this is working
/signin --> POST = success/fail  // sign in into service - POST is used for security purposes
/register --> POST = user  // create an account 
/profile/:userId --> GET = user  // profile of a user (home screen for each user)
/image --> PUT --> user  // ranking

*/