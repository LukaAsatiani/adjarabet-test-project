const express = require('express');
const { validate } = require('express-validation');
const router = express.Router();

const needAuth = require('../middleware/needAuth');
const controller = require('../controllers').auth;
const validation = require('../validation')

router.post('/signup', needAuth(false), validate(validation.auth, {}, {}), controller.signup);

router.post('/login', needAuth(false), validate(validation.auth, {}, {}), controller.login);

router.get('/logout', needAuth(), controller.logout);

module.exports = router;