const express = require('express')
const {addPool,updatePool, getPools} = require('./pool.controller')
const router = express.Router()

router.get('/:pageNumber', getPools) 
router.post('/' , addPool)
router.put('/:id', updatePool)

module.exports = router