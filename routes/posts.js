require('dotenv').config();
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const postController = require('../controllers/post');

router.post('/', asyncHandler(postController.add));

module.exports = router;
