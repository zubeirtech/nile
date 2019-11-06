require('dotenv').config();
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const indexController = require('../controllers/index');

/* GET home page. */
router.post('/auth', asyncHandler(indexController.auth));
router.post('/upload', asyncHandler(indexController.upload));

module.exports = router;
