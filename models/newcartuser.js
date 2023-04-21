const mongoose = require('mongoose');

const userCart = mongoose.Schema({
    owner: String, 
    cartData : [{
        "product_id" : String,
        "cartQuantity" : Number
    },]
}
)

module.exports = userCart;