const mongoose = require('mongoose');
const category = require('../models/category');


const item = mongoose.model('categoryDetails',category)

// =============== add category wise product ================

module.exports.addCategory = async(req, res, next) => {
    let productCategory = new item(req.body);
    await productCategory.save()
    .then(() => res.send("category added successfully"))
    .catch((err) => res.send(err));
    
}

//==================  display category =========================

module.exports.getAllCategory = async ( req, res, next) => {
    await item.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
}