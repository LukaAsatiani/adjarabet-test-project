require('dotenv').config();

const db = require('../models');
const service = require('../services').products;

module.exports = {
  get: async (req, res) => {
    const page = req.params.page || 1;
		const client = req.app.locals.redisClient;

		const products = await service.getByPage(page, client);
		
		res.send(products);
  },

	view: async (req, res) => {
		const count = await service.view(req.params.product, req.auth.user_id);
		res.send(count);
	}
}