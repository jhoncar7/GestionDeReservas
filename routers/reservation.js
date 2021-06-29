const express = require('express');
const router = express.Router();
const user = require('../controllers/user')
const reservation = require('../controllers/reservation');
const getWeather = require('../integration/weather');
const { validateDate, unixToDate } = require('../utils');

router.get('/api/v1/reservation', async (req, res) => {
    const reservas = await reservation.getReservations();
    if (reservas.length == 0) {
        res.status(204);
    }
    return res.json({ "count": reservas.length, reservas });

})

router.get('/api/v1/reservation/:date', async (req, res) => {
    let { date } = req.params;
    if (!date) {
        return res.status(400).json({ "error": "el parametro date es requerido" });
    }
    let searchReservations;
    //puede recibir una query (...?type=date) y pedir segun date(22/06/21) o unix(1625002393)
    if(req.query.type == 'date') {
        searchReservations = await reservation.getReservationByDate(date);
        if (!searchReservations) {
            return res.status(404).json({ "error": `no se encontro ninguna reservacion en dicha fecha (${date})` });
        }
    } else {
        searchReservations = await reservation.getReservationByUNIX(date);
        if (!searchReservations) {
            return res.status(404).json({ "error": `no se encontro ninguna reservacion en dicha fecha (${unixToDate(date)})` });
        }
    }
    return res.json(searchReservations);
})

router.post('/api/v1/reservation', async (req, res) => {
    let { date, userId } = req.body;
    if (!date || !userId) {
        return res.status(400)
            .json({ "error": "parametros requeridos en POST 'date' 'userId', los parametros deben enviarse por el body" });
    } else {
        let searchUser = await user.getUser(userId);
        if (!searchUser) {
            return res.status(400)
                .json({ "error": "Usuario no encontrado" });
        }
        let error = validateDate(date);
        if (error[0]) {
            return res.status(400).json({ "error": error[1] });
        }
        let reserva = await reservation.getReservationByUNIX(date)
        let reservaId = "";
        if (!reserva) {
            reserva = await reservation.addReservation(date)
            reservaId = reserva.ops[0]._id;
        } else {
            reservaId = reserva._id;
        }
        let saved = await reservation.addUserToReservation(userId, reservaId);
        if(saved) {
            let weather = await getWeather(date);
            return res.status(201).json({ "success": true, "usuario": searchUser, "clima": weather });
        } else {
            return res.status(403).json({ "error": "el usuario ya tiene esta fecha reservada" });
        }
    }
});

router.put('/api/v1/reservation/:id', async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let updatedUser = await user.updateUser(req.body, id);
    if (!updatedUser) {
        return res.status(404).json({ "error": "el usuario no existe" });
    } else if (updatedUser.result.ok == 1) {
        // TODO: devolver el usuario creado en forma de objeto
        return res.json(updatedUser);
    }
})

router.delete('/api/v1/reservation/:id', async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let searchUser = await user.getUser(id);
    if (!searchUser) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    await deleteDataMethod.deleteUser(id);
    return res.json({ "success": true, "deletedUser": searchUser });
});

module.exports = router;