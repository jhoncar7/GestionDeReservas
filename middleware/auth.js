const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        res.status(401).send({error: 'Necesitas autorizacion para realizar esta accion'})
    }
}

module.exports = auth;