const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getUserLogin(email, password) {
    const mongoClient = await connection.getConnection();
    const user = await mongoClient.db('ReservasPuesto').collection('users').findOne({ email: email });

    if (!user) {
        throw new Error('Usuario no existe')
    }

    const isValido = bcrypt.compareSync(password, user.password);

    if (!isValido) {
        throw new Error('Password invalida')
    }
    return user;
}

async function generateJWT(user) {
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1h' });
    return token;
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

async function deleteUser(id) {
    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('ReservasPuesto')
        .collection('users')
        .deleteOne({ _id: new ObjectId(id) });

    return result;
}

async function addUser(user) {
    user.reservas = [];
    const mongoClient = await connection.getConnection();
    user.password = bcrypt.hashSync(user.password, 8);
    const result = await mongoClient.db('ReservasPuesto')
        .collection('users')
        .insertOne(user);
    return result;
}

async function updateUser(user, id) {
    let userById = await getUser(id);
    if (!userById) {
        return null;
    }
    if (Object.keys(userById).length > 0) {
        const mongoClient = await connection.getConnection();
        const query = { _id: new ObjectId(id) };
        let key = Object.keys(user);
        let value = Object.values(user);
        let object = {};

        const newValues = { $set: {} };

        for (let j = 0; j < key.length; j++) {
            if (key[j] != '_id') {
                object[key[j]] = value[j];
            }
        }
        newValues.$set = object;
        if (Object.keys(object).length > 0) {
            const result = await mongoClient.db('ReservasPuesto')
                .collection('users')
                .updateOne(query, newValues);

            return result;
        } else {
            console.log('set esta totalmente vacio');
            return null;
        }


    } else {
        console.log('no existe el id enviado');
        return null;
    }
}

async function updateUserReserva(array,id) {
    console.log('arrayyyy', array);
    console.log('id: ', id);
    const mongoClient = await connection.getConnection();
    const query = { _id: new ObjectId(id) };
    const newValues = {
        $set: {
            reservas: array
        }
    }

    const result = await mongoClient.db('ReservasPuesto').collection('users')
                    .updateOne(query,newValues);
    
    return result;
}


module.exports = {generateJWT, getUserLogin, getUsers, getUser, deleteUser, addUser, updateUser, updateUserReserva }
