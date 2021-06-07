const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();

const db = require('../models');
const service = require('../services').auth;

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
		const attempt = await service.login({username, password});
		
		return res.send(attempt);
  },

  signup: async (req, res) => {
    const {username, password} = req.body;
		const attempt = await service.signup({ username, password });

		res.send(attempt);
  },

  logout: async (req, res) => {
    const { user_id } = req.auth
    
    const user = await db.user.findOne({where: {id: user_id}});
    await user.update({logout_count: user.logout_count + 1});
    
    res.send({
      ok: true,
      message: 'user.logout'
    });
  }
}