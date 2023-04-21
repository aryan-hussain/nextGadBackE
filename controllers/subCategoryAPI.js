const mongoose = require('mongoose');
const subCategory = require('../models/subCategory');

const itemSubCategory = mongoose.model('sub_category_details',subCategory);

module.exports.addSubCategory = async(req, res, next)=>{
    let subItem = new itemSubCategory(req.body);
    await subItem.save()
    .then((data)=>res.send("data saved ! "+data))
    .catch((err)=>res.send(err));   
}

// =========== get sub category on the basis of category =============

module.exports.fetchSubCategory = async(req, res, next)=>{

    let {category_id} = req.query
    console.log(category_id)
    let items = await itemSubCategory.find({category_id});
    console.log(items)
    
    res.send(items);
    
}
