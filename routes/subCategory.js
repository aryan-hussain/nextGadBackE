const express = require('express');
const controller = require('../controllers/subCategoryAPI');

const app = express();

app.post('/addSubCategory',controller.addSubCategory);
app.get('/getSubCategory',controller.fetchSubCategory)

module.exports = app;