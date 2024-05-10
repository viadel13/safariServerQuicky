const express = require('express');
const safariController = require('../controller/safari.controller');
const router = express.Router();

router.get('/OTP', safariController.OTP);
router.get('/token', safariController.token);

module.exports = router;