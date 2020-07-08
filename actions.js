const express = require('express');
const router = express.Router();

// define the home page route
router.get('/', function (req, res) {
    res.send('Birds home page')
})
// define the about route
router.post('/newuser', function (req, res) {
    console.log('About birds')
})

module.exports = router