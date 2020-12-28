const mongoose=require("mongoose");
const Schema=mongoose.Schema;
let s1=new Schema({
       username:{type:String},
       userPicture:{type:String},
       createdAt:{type:Date, default:Date.now},
       body:String,
       comments:[
           {username:{type:String},
           createdAt:{type:String},
           body:String
        }
       ],
       likes:[
           {
            username:{type:String},
            createdAt:{type:String}
           }
       ],
       user:{
           type:Schema.Types.ObjectId,
           ref:'users'
       }
   
});

module.exports=mongoose.model('posts',s1);