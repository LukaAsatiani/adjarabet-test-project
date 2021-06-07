const axios = require('axios');
const { promisify } = require('util')
const db = require('../models');
require('dotenv').config();

module.exports = {
	getByPage: async (page, client) => {
		// const delAsync = promisify(client.del).bind(client);
		const setAsync = promisify(client.set).bind(client);
		const getAsync = promisify(client.get).bind(client);
		const key = `page:${page}`;
		
		const data = await getAsync(key);

		if (data)
			return JSON.parse(data);

		const json = await axios.get(`https://reqres.in/api/products?page=${page}`)

		if (page > json.data.total_pages)
			return {
				ok: false,
				message: 'Products page not found'
			}

		const products = {
			ok: true,
			list: json.data.data,
			options: {
				current_page: json.data.page,
				total_pages: json.data.total_pages,
				per_page: json.data.per_page
			}
		}

		setAsync(key, JSON.stringify(products));
		client.expire(key, process.env.Cache_Expire || 300);
		return products;
	},

	view: async (product_id, user_id) => {
		const count = await db.product_views.count({ where: { product_id: product_id, user_id: user_id } });

		if (count === 0)
			await db.product_views.create({ product_id: product_id, user_id: user_id });

		const views_count = await db.product_views.count({ where: { product_id: product_id } });
		
		return {
			ok: true,
			views_count
		}
	}
}