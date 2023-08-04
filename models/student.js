const mongoose = require('mongoose');

const Student = new mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},

college:{
    type:String,
    required:true
},

placement_status:{
type:String,
required:true
},

dsa_score:{
    type:Number,
},

Webd_score:{
    type:Number
},

react_score:{
    type:Number
},

interview:[{
    type:mongoose.Schema.ObjectId,
    ref:'Interview'
}]

}, {timestamps:true});

module.exports = mongoose.model('Student', Student);