const express = require('express');
const app = express();
const controller = require('../controllers/productAPI');
// ======================= ALL PRODUCTS API =========================

// ====================== TO FETCH ALL THE PRODUCTS =================
app.get('/allProducts',controller.getProducts);
// ====================== TO ADD PRODUCTS ===========================
app.post('/addproducts',controller.addProducts);
// ======================TO FETCH PRODUCTS BY BRAND NAME ============
app.post('/productByBrand',controller.getProductsByBrand);
// ======================TO DELETE PRODUCT ==========================
app.delete('/deleteproduct',controller.deleteProduct);
// ====================== TO UPDATE PRODUCT =========================
app.post('/updateproduct',controller.updateProduct);
// ====================== TO FETCH PRODUCT BY CATEGORY ==============
app.get('/getProductsByCategory',controller.getProductsByCategories);

module.exports = app;