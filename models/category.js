const mongoose = require('mongoose')

const category = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

module.exports = category;