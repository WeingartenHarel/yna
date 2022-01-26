import HttpService from './HttpService'
// const KEY = 'poolsDB';

export const poolService = {
    query,
    getById,
    remove,
    save,
    update,
}

function query(pageNumber) {
    console.log('query pageNumber',pageNumber)
    return HttpService.get(`pool/${pageNumber}`,);
}

function getById(poolId) {
    return HttpService.get(`pool/${poolId}`);
}

function remove(poolId) {
    return HttpService.delete(`pool/${poolId}`);
}

function save(pool) {
    return HttpService.post('pool', pool)
}

function update(pool) {
    return HttpService.put(`pool/${pool._id}`, pool);
}


function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}