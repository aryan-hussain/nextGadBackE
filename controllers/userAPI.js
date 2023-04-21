const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// requiring model
const validation = require("../validations/customValidation");
const userModel = require('../models/signupModels');
let User = mongoose.model('signupDetails', userModel);

//  ====================== SIGNUP CONTROLLER FUNCTION =================

module.exports.signup = async function (req, res, next) {

    console.log(req.body)
    let {username, phoneNumber, email, address, password } = req.body;
    let userExist = await User.findOne({ email});
    if (userExist) {
        return res.status(400).json({ message: "user already exist" });
        
    }
    else {
        let phone = req.body.phoneNumber;
        console.log(phone);
        let result = validation.uservalidation(username, phone, password, email);
        console.log(result)
        if (result == true) {
            password = await bcrypt.hash(password, 10);
            const userobj = new User({username,phoneNumber, email, address, password });
            await userobj.save();
            return res.status(200).json({message: "saved!"})
        }
        else {
           return res.status(500).json({ result });
        }

    }
}

//  =========================== LOGIN CONTROLLER FUNCTION ======================

module.exports.login = async function (req, res, next) {

    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          return res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          console.log("inside if ")
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          console.log(token);
          return res.status(200).json({_id : user._id,username : user.username,email : user.email, phonenumber : user.phonenumber, token : user.token});
        }
        return res.status(400).send("Invalid Credentials");
      } catch(err){
        console.log(err);
        console.log("this is error part");
      }

    // let user = await user.findOne({ email: req.body.email });
    // if (user) {
    //     let result = await bcrypt.compare(req.body.password, user.password);
    //     // console.log(result);
    //     if (result) {
    //         console.log(result);
    //         return res.send(200).json({message:"logged in succesfully"});
    //     } else {
    //         console.log(result);
    //         return res.status(500).json({message:"Incorrect password!"});
    //     }
    // } else {
    //     return res.status(500).json({message:"user doesn't exist"});
    // }
}

// ============== fetch all data ===================

module.exports.fetchData = async function (req, res, next) {
    await user.find().then((getalldata) => {
        return res.status(200).send(getalldata)
    })
        .catch((err) => es.status(500).send(err.message));
}

//================get single person details ================

module.exports.getUser = async function (req, res, next) {
    await User.findOne({ email: req.query.email }).then((data) => {
        return res.status(200).send(data)
    })
        .catch((err) => {
           return res.status(500).send(err.message)
        });
}

// =============== change password =========================

module.exports.changePassword = async function (req, res, next) {
    await user.findOneAndUpdate({ email: req.body.email }, { password: req.body.password }).then((data) => { res.status(200).send("password Updated!") })
        .catch((err) => res.status(500).send(err.message));
}