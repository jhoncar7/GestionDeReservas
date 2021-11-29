const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function getDBConnection(){
    const mongoClient = await connection.getConnection();
    const DB = connection.getDBName();

    return mongoClient.db(DB).collection('users');
}

async function getUserLogin(email, password) {
    const userCollection = await getDBConnection();
    const user = userCollection.findOne({ email: email });

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
    const userCollection = await getDBConnection();
    const result = userCollection.find().toArray();
    return result;
}

async function getUser(id) {
    let user = undefined;
    try {
        const userCollection = await getDBConnection();
        user = userCollection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.log('user not found');
    }
    return user;
}

async function deleteUser(id) {
    const userCollection = await getDBConnection();
    const result = userCollection.deleteOne({ _id: new ObjectId(id) });

    return result;
}

async function addUser(user) {
    user.reservas = [];
    user.profile = user.profile.toUpperCase();
    user.area = user.area.toUpperCase();
    user.password = bcrypt.hashSync(user.password, 8);
    const userCollection = await getDBConnection();
    const result = userCollection.insertOne(user);
    return result;
}

async function updateUser(user, id) {
    let userById = await getUser(id);
    if (!userById) {
        return null;
    }
    if (Object.keys(userById).length > 0) {
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
            const userCollection = await getDBConnection();
            const result = userCollection.updateOne(query, newValues);

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
    const query = { _id: new ObjectId(id) };
    const newValues = {
        $set: {
            reservas: array
        }
    }

    const userCollection = await getDBConnection();
    const result = userCollection.updateOne(query,newValues);
    
    return result;
}

async function verifyUsersArea(name){
    const userCollection = await getUsers(); 
    let result=[];
    userCollection.find(function(element) {
        if(element.area == name){
            result.push(element);
        } 
      });
    return result;
}

async function verifyUsersProfile(name){
    const userCollection = await getUsers();
    let result =[];
    userCollection.find(function(element) {
        if(element.profile == name){
            console.log(element)
            result.push(element);
        } 
      });
    return result;
}

async function updateAreaUsers(users, newAreaName){
    users.forEach(element => {
        console.log(element)
        element.area = newAreaName;
        updateUser(element, element._id);
    });
}

async function updateProfileUsers(users, newProfile){
    users.forEach(element => {
        element.profile = newProfile;
        updateUser(element, element._id);
    });
}

module.exports = {generateJWT, getUserLogin, getUsers, getUser, deleteUser, addUser, updateUser, 
    updateUserReserva, verifyUsersArea, verifyUsersProfile, updateAreaUsers, updateProfileUsers }
