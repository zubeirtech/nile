require('dotenv').config();
const express = require('express');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bcrypt = require('bcryptjs');
const channelController = require('../controllers/channel');

const jwtMW = exjwt({
  secret: process.env.JWT_PRIVATE_KEY,
});

router.post('/', asyncHandler(channelController.add));