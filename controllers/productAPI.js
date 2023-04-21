const mongoose = require('mongoose');
const item = require('../models/product');
const product = mongoose.model('productDetails', item);

// =================== get all products =========================

module.exports.getProducts = async (req, res, next) => {
    let result = await product.find();
    console.log(result);
    res.send(result);
}

// =========================  add products ==================================================
module.exports.addProducts = async (req, res, next) => {
    let Product = new product(req.body);
    return await Product.save().then(() => res.status(200).send("product added successfully!")).catch((err) => res.status(500).send("error!"))
}

// ========================= get product by brand name ======================================
module.exports.getProductsByBrand = async (req, res, next) => {
    let brand = req.body.brand;
    let products = await product.find({ brand });
    res.send(products);
}

// =================delete product ==========================================================

module.exports.deleteProduct = async (req, res, next) => {
    let name = req.body.name;
    console.log(name);
    let getProduct = await product.findOne({ "name": name });
    console.log(getProduct.id);
    if (getProduct) {
        await product.findByIdAndDelete(getProduct).then(() => res.send("deleted successfully!"))
            .catch((err) => res.send(err));
    }
    else {
        res.send("product does not exist!")
    }
}
// ================= update product =======================================================
module.exports.updateProduct = async (req, res, next) => {
    let item = req.body;
    console.log(item);
    let name = req.body.name;
    let gproduct = await product.findOne({ name });
    let id = gproduct.id;
    await product.findByIdAndUpdate(id, item).then((data) => res.send(data)).catch((err) => res.send("can not update"));
}

// ==================== search by category id =============================================
module.exports.getProductsByCategories = async (req, res, next) => {
    let { subcategory_id } = req.query;
    console.log(subcategory_id)
    let products = await product.find({ subcategory_id });
    console.log(products)
    res.send(products);

}


