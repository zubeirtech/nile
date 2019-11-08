require('dotenv').config();
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const exjwt = require('express-jwt');
const upvoteController = require('../controllers/upvote');

const jwtMW = exjwt({
  secret: process.env.JWT_PRIVATE_KEY,
});

router.post('/', jwtMW, asyncHandler(upvoteController.add));
router.get('/:id', asyncHandler(upvoteController.getOne));
router.get('/', asyncHandler(upvoteController.get));
router.delete('/:id', jwtMW, asyncHandler(upvoteController.delete));
// router.get('/', asyncHandler(postController.getAll));
// router.get('/:id', asyncHandler(postController.getOne));

module.exports = router;