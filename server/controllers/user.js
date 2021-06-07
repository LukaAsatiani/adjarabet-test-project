require('dotenv').config();

const db = require('../models');
const service = require('../services').user;

module.exports = {
  profile: async (req, res) => {
    const id = req.auth.user_id;
		const user = await service.getByID(id);
    
    return res.send(user);
  }
}