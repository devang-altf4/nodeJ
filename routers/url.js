const express = require('express');
const router = express.Router();
const { generateShortUrl,  handleGetanalytics } = require('../controllers/url');


router.post('/',generateShortUrl);
router.get('/analytics/:shortid',handleGetanalytics);










module.exports = router;