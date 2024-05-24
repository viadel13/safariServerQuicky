const express = require('express');
const safariController = require('../controller/safari.controller');
const router = express.Router();

router.post('/phone', safariController.addPhone);
router.post('/users', safariController.addUser);
router.post('/login', safariController.login);
router.post('/orders', safariController.orders);
router.get('/token', safariController.getToken);
router.get('/OTP', safariController.OTP);
router.get('/user', safariController.user);
router.get('/getOrders', safariController.getOrders);
router.get('/getOrdersId/:code', safariController.getOrdersId);

module.exports = router;