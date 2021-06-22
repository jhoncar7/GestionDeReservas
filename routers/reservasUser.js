const express = require('express');
const router = express.Router();
const user = require('../controllers/user')
const reservation = require('../controllers/reservation');

/* router.get('/api/v1/reservation', async (req, res) => {
    const users = await user.getUsers();
    if (users.length == 0) {
        res.status(204);
    }
    return res.json({ "count": users.length, users });

}) */

/* router.get('/api/v1/reservation/:id', async (req, res) => {
    let { id } = req.params;
    let searchUser = await user.getUser(id);
    if (!searchUser) {
        return res.status(404).json({ "error": "usuario no encontrado" });
    }
    return res.json(searchUser);
}) */

router.post('/api/v1/reservation', async (req, res) => {
    
    let { date, userId } = req.body;
    
    if (!date || !userId) {
        return res.status(400)
            .json({ "error": "parametros requeridos en POST 'date' : (aaaa/mm/dd) 'userId', los parametros deben enviarse por el body" });
    } else {
        let searchUser = await user.getUser(userId);

        if (!searchUser) {
            return res.status(400)
                .json({ "error": "Usuario no encontrado" });
        }

        let validarFechaYReserva = await reservation.validarFechaYReserva(searchUser, date)

        if(!validarFechaYReserva){
            return res.status(400).json({"error" : {"1": "1.Fecha invalida", "2" :  "2.Ya existe la reserva", "3" : "3.La fecha debe ser Posterior", "4" : "4. formato año/mes/dia (aaaa/mm/dd)"}})
        }else{
            user.updateUserReserva(searchUser.reservas, userId)
            return res.status(201).json({ "success": true, "Reservado para el dia": date }); 
        }
        /* let reservaId = "";
        if (!reserva) {
            reserva = await reservation.addReservation(date)
            console.log("new reserva", reserva)
            reservaId = reserva.ops[0]._id;
        } else {
            reservaId = reserva._id;
        }
        user.addUserToReservation(userId, reservaId);

        return res.status(201).json({ "success": true, "usuario": searchUser }); */
    }
});

/* router.delete('/api/v1/reservation/:id', async (req, res) => {
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
}); */


module.exports = router;