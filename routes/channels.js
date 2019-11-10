require('dotenv').config();
const express = require('express');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bcrypt = require('bcryptjs');
const channelController = require('../controllers/channel');

const router = express.Router();

const jwtMW = exjwt({
  secret: process.env.JWT_PRIVATE_KEY,
});

router.post('/', asyncHandler(channelController.add));
router.get('/', asyncHandler(channelController.get));
router.get('/:id', asyncHandler(channelController.getOne));
router.patch('/:id', jwtMW, asyncHandler(channelController.update));

module.exports = router;