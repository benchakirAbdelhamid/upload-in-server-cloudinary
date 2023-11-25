const express = require('express');
const router = express.Router();
const upload = require('../controllers/uploadImage')

router.post('/upload-image', upload)