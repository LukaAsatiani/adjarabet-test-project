const express = require('express');
const { validate } = require('express-validation');
const router = express.Router();

const needAuth = require('../middleware/needAuth');
const controller = require('../controllers').products;

router.get('/:page([0-9]+)', needAuth(), controller.get);

router.get('/details/:product([0-9]+)', needAuth(), controller.view);

module.exports = router;