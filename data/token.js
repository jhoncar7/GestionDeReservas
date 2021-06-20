const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');

async function generateJWT(user){
    const token = jwt.sign({_id : user._id, email:user.email}, 'secret123',{expiresIn:'1h'});
    return token;
}

module.exports = {generateJWT};