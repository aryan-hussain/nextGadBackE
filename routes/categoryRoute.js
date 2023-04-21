const express = require('express');
const controller = require('../controllers/categoryAPI');
const app = express();
const auth = require('../validations/auth');
app.post('/addCategory',controller.addCategory);
app.route('/getCategory').get(auth,controller.getAllCategory);
// app.get('/getCategory',controller.getAllCategory);

module.exports = app;