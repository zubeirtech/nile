require('dotenv').config();
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const indexController = require('../controllers/index');

/* GET home page. */
router.post('/auth', asyncHandler(indexController.auth));
router.post('/video/upload', asyncHandler(async (req, res, next) => {
  try {
    const file = req.files.file;
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      next()
      return;
    }

    const uploadPath = '/home/zumo/GIT/zumo/webapps/nile/nile/files/' + file.name;

    file.mv(uploadPath, function(err) {
      if(err){ 
        console.log(err);
        return res.status(500).send('Error');
        next()
      }

      res.status(200).send('File uploaded succesfully');
      next()
    })
    
    
  } catch (error) {
    console.error(error);

  }
}));

module.exports = router;
