const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(email, password) {
    console.log('aut service', email, password);
    logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) throw new Error('email and password are required!')

    const user = await userService.getByEmail(email)
    console.log('login user',user)
    if (!user) return Promise.reject('Invalid email or password')
    console.log('userrrrrrr',user)
    // const match = await bcrypt.compare(password, user.password)
    // if (!match) return Promise.reject('Invalid email or password')
    // console.log('userrrrrrr',password,email)
    if(user.password !== password || user.email !== email){
        return Promise.reject('Invalid email or password')
    }
    delete user.password;
    return user;
}

async function signup(email, password, username,isAdmin) {
    logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!email || !password || !username) return Promise.reject('email, username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    console.log("auth service password",password)
    return userService.add({email, password: hash, username,isAdmin})
}

module.exports = {
    signup,
    login,
}