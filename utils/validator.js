module.exports.validateRegisterInputs = (username, email, password, confirmPassword) => {

    let errors = {};

    if (username.trim() == '') {
        errors.username = 'Username is empty';
    }

    if (email.trim() == '') {
        errors.email = 'Email is empty';
    } else {
        const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(email.trim().toLowerCase()).match(regexpEmail)) {
            errors.email = 'Email is invalid';

        }
    }

    if (password== '') {
        errors.password = 'Password is empty';
    }
    if(password!=confirmPassword){
        errors.confirmPassword='Password and Confirm Password doesnot match';
    }

    return {
        errors,
        valid:Object.keys(errors).length>0
    }

};

module.exports.validateLoginInputs=(username,password)=>{
    let errors = {};

    if (username.trim() == '') {
        errors.username = 'Username is empty';
    }
    if (password== '') {
        errors.password = 'Password is empty';
    }

    return {
        errors,
        valid:Object.keys(errors).length>0
    }
}