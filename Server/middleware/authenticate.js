var User = require('../controllers/userController');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        else if (!['Faculty', 'Non Faculty', 'Worker', 'EE', 'JE', 'AE'].includes(user.desig)) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        const error = new Error("Access Denied.")
        error.statusCode = 401
        error.mesage = "Access Denied"
        next(error)
    });
};


module.exports = { authenticate };