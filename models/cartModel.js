const mongoose = require('mongoose');

const cart = mongoose.Schema({
    "userId" : {
        type : String,
        required : true
    },
    products : [{
        "product_id" : String,
        "cartQuantity" : Number,
        "image" : String,
        "name" : String,
        "brand": String,
        "subcategory_id":String,
        "price":Number,
        "desc":String
    },]
})

module.exports = cart;