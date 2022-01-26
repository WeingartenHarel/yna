const express = require('express')
const {requireAuth, requireAdmin,requireUser} = require('../../middlewares/requireAuth.middleware')
const {addPool,updatePool, getPools, getPool, deletePool} = require('./pool.controller')
const router = express.Router()

// middleware that is specific to this router

//router.use(requireUser)
//router.use(requireAdmin)
router.get('/:pageNumber', getPools) //requireUser
router.get('/:id', getPool) //requireUser

router.post('/' , addPool) //,requireAdmin
router.put('/:id', updatePool) //, requireAdmin
router.delete('/:id', deletePool) //, requireAdmin

module.exports = router