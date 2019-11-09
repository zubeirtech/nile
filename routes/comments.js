require('dotenv').config();
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const exjwt = require('express-jwt');
const commentController = require('../controllers/comment');

const jwtMW = exjwt({
  secret: process.env.JWT_PRIVATE_KEY,
});

router.post('/', jwtMW, asyncHandler(commentController.add));
router.get('/:id', asyncHandler(commentController.getOne));
router.get('/', asyncHandler(commentController.get));
router.delete('/:id', jwtMW, asyncHandler(commentController.delete));

module.exports = router;