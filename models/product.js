const mongoose = require('mongoose');

const product = mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    subcategory_id : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    desc : {
        type : String,
        required : true
    }

})

module.exports = product;