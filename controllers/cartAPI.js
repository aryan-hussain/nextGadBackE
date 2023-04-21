const mongoose = require('mongoose');
// const cartModel = require('../models/cartModel');
let newcartModel = require('../models/newcartuser');
// const userCart = mongoose.model('userPersonalCart', cartModel);
const newcart = mongoose.model('userPersonalCart1',newcartModel)
// const auth = require

//  ==========================  Add CART ==============================================

module.exports.newCart = async (req, res, next) => {
    let user = req.user.user_id;
    console.log(user);
    console.log("details------------------")
            if(req.body.product_id == "" ){
                return res.status(406).json({message : "Product Id is required"})
            }
            else if(req.body.cartQuantity == 0){
                return res.status(406).json({message : "quantity is required"})
            }
            else if(req.body.subcategory_id == "" ){
                return res.status(406).json({message : "subcategory id is required"})
            }
            else if(req.body.price == 0){
                return res.status(406).json({message : "price is required"})
            }
   
    let isCartExist = await userCart.findOne({ userId: user });
    if (isCartExist) {
        let index = isCartExist.products.findIndex(item => item.product_id == req.body.product_id);
        if (index > -1) {
            isCartExist.products[index].cartQuantity = req.body.cartQuantity;
            let result = await userCart.findByIdAndUpdate(isCartExist._id, isCartExist);
            result = await userCart.findById(isCartExist._id);
            return res.status(200).send("quantity got updated" + result);
        }
        isCartExist.products.push({
            product_id: req.body.product_id,
            cartQuantity: req.body.cartQuantity,
            image: req.body.image,
            name : req.body.name,
            brand: req.body.brand,
            subcategory: req.body.subcategory_id,
            price: req.body.price,
            desc : req.body.desc,
        });
        let result = await userCart.findByIdAndUpdate(isCartExist._id, isCartExist);
        res.send("product added successfully" + result);
    }
    else {
        let cartData = {
            "userId": req.user.user_id,
            products: [
                {
                    "product_id": req.body.product_id,
                    "cartQuantity": req.body.cartQuantity,
                    "image": req.body.image,
                    "name" : req.body.name,
                    "brand": req.body.brand,
                    "subcategory": req.body.subcategory_id,
                    "price": req.body.price,
                    "desc" : req.body.desc,
                },
            ]
        }
        try {
            let cart = new userCart(cartData);
            console.log(cart)
            await cart.save();
            return res.status(200).send("cart added successfully");
        }
        catch (err) {
            return res.status(500).send("problem!")
        }
    }
}
// ============================ TO DELETE PRODUCT FROM CART ================================
module.exports.deleteProductsFromCart = async(req, res, next)=>{
    let product_id = req.body.product_id;
    let cartExist = await userCart.findOne({userId : req.user.user_id});
    if(cartExist){
        let index = await cartExist.products.findIndex(item => item.product_id == product_id);
        cartExist.products.splice(index,1);
        let result = await userCart.findByIdAndUpdate(cartExist._id, cartExist);
        res.send("product deleted successfully" + result);
        
    } 
}
// ================================== FETCH CART ==========================================

module.exports.fetchCart = async(req, res, next)=>{
    let user = req.user.user_id;
    console.log(user);
    let result = await userCart.findOne({userId : user});
    if(result == null){
        res.status(500).send("Opps! Something went Wrong..")
    }
    else{
        res.status(200).send(result);
    }
}
// ================================ Delete Cart ===========================================

module.exports.deleteCart = async(req, res, next)=>{
    let cartId = req.body.id;
    await userCart.findByIdAndDelete(cartId)
    .then((data)=>res.status(200).send("Your cart is empty!"))
    .catch((err)=>res.status(500).send("something went wrong!"));    
}

// ================================== add to cart updated code ============================

module.exports.productAdded = async(req,res,next)=>{
    let cartData = {
        category :{
        "userId": req.user.user_id,
        "category_name" : req.body.category_name,
        subcategory : {
            "subcategory_name" : req.body.subcategory_name,
        products: [
            {
                "product_id": req.body.product_id,
                "cartQuantity": req.body.cartQuantity,
                "image": req.body.image,
                "name" : req.body.name,
                "brand": req.body.brand,
                "subcategory": req.body.subcategory_id,
                "price": req.body.price,
                "desc" : req.body.desc,
            },
        ]
    },
    }
}
    console.log(cartData)
    let cart = new newcart(cartData);
    return await cart.save().then((data)=>res.status(200).json({message : "saved!"})).catch((err)=>res.status(400).json({message : err}));


}
// ================================ shopping =====================

module.exports.buyProduct = async(req, res, next)=> {
    let user = req.user.user_id;
    // console.log(user);
    // let isCartExist = await userCart.findOne({ userId: user });
    // let products = isCartExist.products;
    // [
    //     { product_id: 'jkdgqi7qewy8qgds78uaswh', cartQuantity: 23 },
    //     { product_id: 'jkdgqi7qewy8qgds78uaswh', cartQuantity: 25 },
    //     { product_id: 'jkdgqi7qewy8qgds78uaswh', cartQuantity: 26 }
    //   ]
    // let cartData1 = req.body;
    // for(val of cartData1){
        
    // }
//     let cartData = {cartData:[
//         {
//             "product_id": req.body.product_id,
//             "cartQuantity": req.body.cartQuantity,
//         },
//     ]
// }
    // console.log(req.body)

 try{   let data = {
        owner: req.user.user_id,
        cartData: req.body
    }
    console.log(data)

    let cart = new newcart(data);
    console.log(cart)
    await cart.save();
    return res.status(201).send(cart);}
    catch{
        return res.status(400).send("Something went wrong.")
    }
    
    
    
}

// ============================ 