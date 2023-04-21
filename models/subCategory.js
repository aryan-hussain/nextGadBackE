const mongoose = require('mongoose');

const subCategory = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category_id : {
        type : String,
        required : true
    }
})

module.exports = subCategory;