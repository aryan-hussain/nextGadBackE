const express = require('express');
const app = express();
const controller = require('../controllers/cartAPI');
const auth = require('../validations/auth');

// ===================== TO ADD CART ======================================================
app.route('/addCart').post(auth,controller.newCart);
// =================== TO DELETE PRODUCTS =================================================
app.route('/deleteproduct').delete(auth,controller.deleteProductsFromCart);

app.route('/fetchcart').get(auth,controller.fetchCart);

app.route('/addtocart').post(auth, controller.productAdded);
// ======================= BUY NOW ======================================================

app.route('/buynow').post(auth,controller.buyProduct);

module.exports = app;