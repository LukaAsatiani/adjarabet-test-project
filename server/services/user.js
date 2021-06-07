const db = require('../models');
require('dotenv').config();

module.exports = {
	getByID: async (user_id) => {
    const user = await db.user.findOne({ where: { id: user_id }, attributes: ['id', 'username']})
  
		if(user)
			return ({
				ok: true,
				user
			});

		return ({
			ok: false,
			message: 'access.denied'
		});
	}
}