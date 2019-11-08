require('dotenv').config();
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const exjwt = require('express-jwt');
const likeController = require('../controllers/like');

const jwtMW = exjwt({
  secret: process.env.JWT_PRIVATE_KEY,
});

router.post('/', jwtMW, asyncHandler(likeController.add));
router.get('/:id', asyncHandler(likeController.getOne));
router.get('/', asyncHandler(likeController.get));
router.delete('/:id', jwtMW, asyncHandler(likeController.delete));
// router.get('/', asyncHandler(postController.getAll));
// router.get('/:id', asyncHandler(postController.getOne));

module.exports = router;