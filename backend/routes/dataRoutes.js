const express = require('express')
const { searchSneakers } = require('../controllers/sneakerController') 
// when contentControllers is ready, add searchContent here

// routing base request to sneakerControllers
const router = express.Router()
router.get('/', searchSneakers)

module.exports = router