const express = require('express');
const auth = require('../validations/auth')
const app = express();

const controller = require('../controllers/userAPI');
app.post('/signup',controller.signup);

app.route('/login').post(controller.login).get(auth,controller.getUser);

app.get('/getallusers',controller.fetchData);

app.route('/getuser').post(controller.getUser).get(auth, controller.getUser);

app.post('/changepassword',controller.changePassword);

module.exports = app;
