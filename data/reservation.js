const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function getReservation(id) {
    const mongoClient = await connection.getConnection();
    let reserva = undefined;
    try {
        reserva = await mongoClient.db('ReservasPuesto').collection('reservas').findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.log('area not found');
    }
    return reserva;
}

async function getReservationByDate(date) {
    const mongoClient = await connection.getConnection();
    const reservas = await mongoClient.db('ReservasPuesto').collection('reservas').findOne({ date: date });
    return reservas;
}

async function addReservation(date) {
    let reserva = { date: date, usersId: [] }
    const mongoClient = await connection.getConnection();
    const result = await mongoClient.db('ReservasPuesto')
        .collection('reservas')
        .insertOne(reserva);
    return result;
}

module.exports = {getReservation, getReservationByDate, addReservation}