module.exports.uservalidation = (name,phone,password,email)=>{
    let passwordRegex = "/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,}$/";
    let usernameRegexp = '^[a-zA-Z ]{3,30}$';
    let phoneRegexp = '^[6-9]{1}[0-9]{9}$';
    let emailRegexp = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
    console.log(phone)
    if(!name.match(usernameRegexp)){
        return "Username cannot be blank and has at least 4 characters and cannot be longer than 30 characters";
    }
    else if(!phone.match(phoneRegexp)){
        return "enter a valid phonenumber";
    }
    else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email)){
        return "enter a valid email";
    }
    else if(!(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,}$/).test(password)){
        return "password must contain special character,an alphabet in upper and lowercase and a digit and has at least 8 characters amd cannot be longer than 30 characters "
    }
    else {
        return true;
    }
    
}
