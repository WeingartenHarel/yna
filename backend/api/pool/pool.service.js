const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

// backend node js get pool query with pagination .....
async function query(params, filterBy = {},) {
    console.log('filterBy, pageNumber', params, filterBy)
    const nPerPage = 3;
    let pageNumber = params.pageNumber-1
    let skipBy = pageNumber > 0 ? pageNumber * nPerPage : 0 
    console.log('skipPagination', skipBy)
    const collection = await dbService.getCollection('pool')
    try {
        const pooles = await collection.find()
            .sort({ _id: 1 })
            .skip(skipBy)
            .limit(nPerPage)
            .toArray()
        console.log('pooles', pooles)
        return pooles
    } catch (err) {
        //console.log('ERROR: cannot find pooles')
        throw err;
    }
}

// add pool api
async function add(pool) {
    const collection = await dbService.getCollection('pool')
    try {
        await collection.insertOne(pool);
        return pool;
    } catch (err) {
        //console.log(`ERROR: cannot insert pool`)
        throw err;
    }
}

// update pool "vote"
async function update(pool) {
    const collection = await dbService.getCollection('pool')
    pool._id = ObjectId(pool._id);
    try {
        await collection.updateOne({ _id: pool._id }, { $set: pool })
        return pool
    } catch (err) {
        //console.log(`ERROR: cannot update pool ${pool._id}`)
        throw err;
    }
}

module.exports = {
    query,
    add,
    update
}


