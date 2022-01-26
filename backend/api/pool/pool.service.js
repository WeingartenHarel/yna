const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

// +
// backend node js get pool query .....
async function query(params, filterBy = {},) {
    console.log('filterBy, pageNumber', params, filterBy)
    // TODO: Build the criteria with $regex
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('pool')
    const nPerPage = 3;
    let pageNumber = params.pageNumber-1
    let skipBy = pageNumber > 0 ? pageNumber * nPerPage : 0 
    console.log('skipPagination', skipBy)
    try {
        const pooles = await collection.find()
            .sort({ _id: 1 })
            //  .skip( pageNumber > 0 ? (  pageNumber  * nPerPage ) : 0 )
            .skip(skipBy)
            .limit(nPerPage)
            .toArray()
        // var pooles = await collection.aggregate([
        //     {
        //         $match: filterBy
        //     }
        // ]).toArray()
        console.log('pooles', pooles)
        return pooles
    } catch (err) {
        //console.log('ERROR: cannot find pooles')
        throw err;
    }
}


async function getById(poolId) {
    const collection = await dbService.getCollection('pool')
    try {
        const pool = await collection.findOne({ '_id': ObjectId(poolId) })
        //delete pool.password

        // pool.givenReviews = await reviewService.query({ byUserId: ObjectId(pool._id) })
        // pool.givenReviews = pool.givenReviews.map(review => {
        //     delete review.byUser
        //     return review
        // })

        //    //console.log('finding pool' ,pool)
        return pool
    } catch (err) {
        //console.log(`ERROR: while finding pool ${poolId}`)
        throw err;
    }
}

async function remove(poolId) {
    const collection = await dbService.getCollection('pool')
    try {
        //ObjectId(poolId)
        await collection.deleteOne({ "_id": ObjectId(poolId) })
    } catch (err) {
        //console.log(`ERROR: cannot remove pool ${poolId}`)
        throw err;
    }
}


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

async function update(pool) {
    //console.log('MIX BACK SERVICE : ',pool);
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


function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) {
        criteria.name = filterBy.name
    }

    return criteria;
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}


