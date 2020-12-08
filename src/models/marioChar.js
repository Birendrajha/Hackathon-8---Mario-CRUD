const mongoose = require('mongoose');

//  Your code goes here
const mario_schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
})

 const marioModel=mongoose.model("mariochar",mario_schema)
 module.exports=marioModel

//module.exports = marioModel;


