const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize')
require('dotenv').config();

async function generateToken(user){
	const token = jwt.sign(
		{ username: user.username, logout_count: user.logout_count, user_id: user.id },
		process.env.JWT_SECRET,
		{
			expiresIn: '3h'
		}
	);
	
	return ({
		user_id: user.id,
		value: token
	});
}

async function login(fields){
	const user = await db.user.findOne({ where: { username: fields.username } });
	const err = {
		ok: false,
		message: 'Invalid username or password.'
	}

	if (!user)
		return err

	const isEqual = await bcrypt.compare(fields.password, user.password);

	if (isEqual) {
		const token = await generateToken(user.dataValues)

		return ({
			ok: true,
			token
		});
	}

	return err
}

async function signup (fields){
	const count = await db.user.count({ where: { username: fields.username } })

	if (count !== 0)
		return ({
			ok: false,
			message: "User already exists."
		})

	const hashedPassword = await bcrypt.hash(fields.password, 12);
	const user = await db.user.create({ ...fields, password: hashedPassword, logout_count: 0, login_count: 0 });
	const token = await generateToken(user.dataValues);

	return ({
		ok: true,
		token,
		message: `User created.`
	});
}

async function logout (user_id) {
	const user = await db.user.findOne({ where: { id: user_id } });
	await user.update({ logout_count: user.logout_count + 1 });

	return ({
		ok: true,
		message: 'User logged out.'
	});
}

module.exports = { signup, login, logout }