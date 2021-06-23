const express = require('express');
const router = express.Router();
const user = require('../controllers/user')
const reservation = require('../controllers/reservation');
const getWeather = require('../integration/weather');

router.get('/api/v1/reservation', async (req, res) => {
    const users = await user.getUsers();
    if (users.length == 0) {
        res.status(204);
    }
    return res.json({ "count": users.length, users });

})

router.get('/api/v1/reservation/:id', async (req, res) => {
    let { id } = req.params;
    let searchUser = await user.getUser(id);
    if (!searchUser) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    return res.json(searchUser);
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
        console.log(error);
        let reserva = await reservation.getReservationByDate(date)
        console.log("reserva", reserva)
        console.log("#########")
        let reservaId = "";
        if (!reserva) {
            reserva = await reservation.addReservation(date)
            reservaId = reserva.ops[0]._id;
            console.log("new reservaId", reservaId);
        } else {
            reservaId = reserva._id;
            console.log("old reservaId", reservaId);
        }
        reservation.addUserToReservation(userId, reservaId);

        let weather = await getWeather(date);

        return res.status(201).json({ "success": true, "usuario": searchUser, "clima": weather });
    }
});

router.put('/api/v1/reservation/:id', async (req, res) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).json({ "error": "el parametro _id es requerido" });
    }
    let updatedUser = await user.updateUser(req.body, id);
    console.log('updatedUser:', updatedUser);
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

function validateDate(date) {
    let reg = new RegExp('^[0-9]+$');
    if (!reg.test(date) || date.length > 20) {
        return [true, "Ingrese una fecha en formato unix"]
    }
    let dateNow = Date.now() / 1000 | 0;
    if (date - dateNow >= 604800 || date - dateNow < 0) {
        return [true, "La fecha a reservar debe ser desde el día de hoy hasta próximos los 6 días"]
    }
    return [false, ""];
}

module.exports = router;