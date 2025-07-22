const express = require('express');
const router = express.Router();
const { handleUserSignup , handleUserLogin } = require('../controllers/user');
router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/',handleUserSignup);
router.post('/login',handleUserLogin);


module.exports = router;