const mongoose = require('mongoose');

const user = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String
    },
    email : {
        type : String
        
    },
    address : {
        type : String
    },
    password : {
        type : String
    }
},
{
    timestamps : true
})

module.exports = user;