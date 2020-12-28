const mongoose=require("mongoose");
const Schema=mongoose.Schema;
let s1=new Schema({
    name:{type:String},
    username:{type:String},
    password:{type:String},
    email:{type:String},
    picture:{type:String},
    createdAt:{type:String}
});

module.exports=mongoose.model('users',s1);