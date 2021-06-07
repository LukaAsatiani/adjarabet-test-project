const express = require('express');
const { validate } = require('express-validation');
const router = express.Router();

const needAuth = require('../middleware/needAuth');
const controller = require('../controllers').user;

router.get('/profile', needAuth(), controller.profile);

module.exports = router;