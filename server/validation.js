const { Joi } = require('express-validation')

const auth = {
  body: Joi.object({
		username: Joi.string()
			.required()
			.min(8)
			.max(25)
			.regex(/[a-zA-Z0-9]/),
    password: Joi.string()
			.required()
			.min(8)
      .max(128)
  }),
}

module.exports = { auth }