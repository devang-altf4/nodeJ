const express = require('express');
const router = express.Router();
const { generateShortUrl, getUrlById } = require('../controllers/url');

router.post('/',generateShortUrl);










module.exports = router;