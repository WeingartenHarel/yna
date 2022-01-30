const logger = require('../../services/logger.service')
const poolService = require('./pool.service')

async function getPools(req, res) {
    try {
        console.log('getPools req.params',req.params)
        const pooles = await poolService.query(req.params)
        res.send(pooles)
    } catch (err) {
        logger.error('Cannot get pooles', err);
        res.status(500).send({ error: 'cannot get pooles' })

    }
}

async function addPool(req, res) {
    try {
        var pool = req.body;
        pool = await poolService.add(pool)
    } catch (err) {
        logger.error('Cannot add pool', err);

    }

    res.send(pool)
}

async function updatePool(req, res) {
    try{
        const pool = req.body;       
        await poolService.update(pool)
        res.send(pool)
    }catch(err){
        //console.log(' CUS AMAK ERORR IN UPDATEING BLYAT !!!!!!!!!!!!! :',err);
    }
}

module.exports = {
    getPools,
    addPool,
    updatePool
}