const express = require('express');
const router = express.Router();
const { login, register, sendOTP,verifyOTP } = require('./authController.js');
const { authenticateToken, getProfile, getDashboard, getEdit } = require('./profileController');


router.route('/login').post(login);
router.route('/register').post(register);

router.route('/sendOTP').post(sendOTP);
router.route('/verify-otp').post(verifyOTP);
router.route('/profile').get(authenticateToken, getProfile);
router.route('/dashboard').get(authenticateToken, getDashboard);

router.route('/edit').post(authenticateToken, getEdit);



module.exports = router;