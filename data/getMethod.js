const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function getUserLogin(email) {
    const mongoClient = await connection.getConnection();
    const user = await mongoClient.db('ReservasPuesto').collection('users').findOne({ email: email });
    return user;
}

async function getUsers() {
    const mongoClient = await connection.getConnection();
    const users = await mongoClient.db('ReservasPuesto').collection('users').find().toArray();
    return users;
}

async function getUser(id) {
    const mongoClient = await connection.getConnection();
    let user = undefined;
    try {
        user = await mongoClient.db('ReservasPuesto').collection('users').findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.log('user not found');
    }
    return user;
}

async function getAreas() {
    const mongoClient = await connection.getConnection();
    const areas = await mongoClient.db('ReservasPuesto').collection('areas').find().toArray();
    return areas;
}

async function getArea(id) {
    const mongoClient = await connection.getConnection();
    let area = undefined;
    try {
        area = await mongoClient.db('ReservasPuesto').collection('areas').findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.log('area not found');
    }
    return area;
}

async function getProfiles() {
    const mongoClient = await connection.getConnection();
    const profiles = await mongoClient.db('ReservasPuesto').collection('perfiles').find().toArray();
    return profiles;
}

module.exports = { getUsers, getUser, getUserLogin, getAreas, getProfiles, getArea };