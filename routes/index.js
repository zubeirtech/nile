require('dotenv').config();
const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');
const asyncHandler = require('express-async-handler');
const indexController = require('../controllers/index');

const jwtMW = exjwt({
  secret: process.env.JWT_PRIVATE_KEY,
});

/* GET home page. */
router.post('/auth', asyncHandler(indexController.auth));
router.post('/upload', asyncHandler(indexController.upload));

module.exports = router;
