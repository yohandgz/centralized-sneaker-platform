const express = require('express')
const { searchSneakers } = require('../controllers/sneakerController') 
const { getContent } = require('../controllers/contentController')

// routing base request to sneakerControllers
const router = express.Router()
router.get('/', searchSneakers)

// routing request for content
router.get('/content', getContent);

module.exports = router