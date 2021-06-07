const express = require('express');
const redis = require('redis')
const { ValidationError } = require('express-validation');
require('dotenv').config();

const routes = require('./routes');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 8000;

const redisClient = redis.createClient(process.env.REDISCLOUD_URL);;

redisClient.on('error', (err) => {
	console.log('Redis server not working.')
})

app.locals.redisClient = redisClient

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

app.use('/auth', routes.auth);
app.use('/users', routes.user);
app.use('/products', routes.products);

app.use(function (err, req, res, next) {
	if (err instanceof ValidationError) {
		return res.send({
			ok: false,
			message: err.details.body[0].message
		});
	}

	return res.status(500).json(err);
})

app.use(function(req, res){
	return res.send({
		ok: false,
		message: 'Route not found.'
	})
})

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`);
	});
})