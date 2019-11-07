require('dotenv').config();
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const exjwt = require('express-jwt');
const postController = require('../controllers/post');

const jwtMW = exjwt({
  secret: process.env.JWT_PRIVATE_KEY,
});

router.post('/', jwtMW, asyncHandler(postController.add));
router.get('/', asyncHandler(postController.getAll));

module.exports = router;
