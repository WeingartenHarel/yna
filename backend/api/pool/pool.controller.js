const logger = require('../../services/logger.service')
const poolService = require('./pool.service')

// TODO: needs error handling! try, catch

async function getPools(req, res) {
    try {
        let pageNumber = req.body;
        console.log('getPools req.params',req.params)
        const pooles = await poolService.query(req.params)
        // const pooles = await poolService.query(req.query)
        ////console.log('pooles',pooles)
        res.send(pooles)
    } catch (err) {
        logger.error('Cannot get pooles', err);
        res.status(500).send({ error: 'cannot get pooles' })

    }
}

async function getPool(req, res) {
    console.log('pool controller getPool',req.params.id)
    const pool = await poolService.getById(req.params.id)
    ////console.log('pool controller',pool)
    res.send(pool)
}

async function deletePool(req, res) {
    //console.log('pool controller delete',req.params.id)
    try {
        await poolService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete pool', err);
        res.status(500).send({ error: 'cannot delete pool' })
    }
}

async function addPool(req, res) {
    try {
        var pool = req.body;
        pool = await poolService.add(pool)
    } catch (err) {
        logger.error('Cannot add pool', err);

    }
   
    //pool.byUser = req.session.pool;
    // TODO - need to find aboutUser
    //pool.aboutUser = {}
    res.send(pool)
}

async function updatePool(req, res) {
    try{
        const pool = req.body;
        //console.log('controlller updatePool',pool)
        
        await poolService.update(pool)
        res.send(pool)
    }catch(err){
        //console.log(' CUS AMAK ERORR IN UPDATEING BLYAT !!!!!!!!!!!!! :',err);
    }
}

module.exports = {
    getPools,
    getPool,
    deletePool,
    addPool,
    updatePool
}