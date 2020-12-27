const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError}=require('apollo-server');

const Users = require('../../models/users');
const {validateRegisterInputs,validateLoginInputs}=require('../../utils/validator');
const generateToken=(user)=>{
    const {username, email, _id}=user;
    return jwt.sign({
        username, email, _id
    },process.env.SECRET_KEY,{expiresIn:'1hr'});
}
let UserMutation = {
    Mutation: {

        async login(root,{loginInput:{username,password}}){
            const {errors,valid}=validateLoginInputs(username,password);
            if(valid){
                throw new UserInputError('Validation Error',{
                    errors
                });
            }

            const userFound=await Users.findOne({username});
            if(!userFound){
                throw new UserInputError('Username does not exists',{
                    errors:'Username does not exists'
                });
            }

            const match=await bcrypt.compare(password,userFound.password);
            if(!match){
                throw new UserInputError('Password did not match',{
                    errors:'Password did not match'
                })
            }
            const token=generateToken(userFound);

            return {
                ...userFound._doc,
                id:userFound._id,
                token

            }


        },

        async register(root, { registerInput: { username, email, password, confirmPassword } }) {
            //Validate the user inputs
            const {errors,valid}=validateRegisterInputs(username, email, password, confirmPassword);
                if(valid){
                    throw new UserInputError('Validation Error',{
                        errors
                    });
                }
            //Check if a user already exists
            const userCheck=await Users.findOne({username});
            if(userCheck){
                throw new UserInputError('Username is already taken',
                {
                    errors:{
                        username:'Username is already taken'
                    }
                });
            }
            //Create new user object and save it to DB
            password=await bcrypt.hash(password,12);

            let newUser = new Users({
                username,
                email,
                password,
                createdAt: new Date().toUTCString()
            })

            const response = await newUser.save();

            let token = generateToken(response);

            return {
                ...response._doc,
                id: response._id,
                token
            };



        }

    }
}
module.exports = UserMutation;