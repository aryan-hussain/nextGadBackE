const mongoose = require('mongoose');

const userCart = mongoose.Schema({
    category : [{
        "userId" : {
            type : String
        },
        "category_name" : String,

        subcategory : [{
            "subcategory_name" : {
            type : String
            },
            products : [
                {
                    "product_id" : String,
                    "cartQuantity" : Number,
                    "image" : String,
                    "name" : String,
                    "brand": String,
                    "subcategory_id":String,
                    "price":Number,
                    "desc":String 
                },
            ]

            
        },]
        
    }]
})

module.exports = userCart;