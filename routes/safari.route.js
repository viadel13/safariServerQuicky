const express = require('express');
const safariController = require('../controller/safari.controller');
const router = express.Router();

router.get('/OTP', safariController.OTP);

module.exports = router;