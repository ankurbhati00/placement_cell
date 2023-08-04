const mongoose = require('mongoose');

const Interview = new mongoose.Schema({

company:{
    type:String,
    required:true,
    unique:true
},

date:{
    type:Date
},
result:{
type:String,
required:true
},

student:[{
    type:mongoose.Schema.ObjectId,
    ref:'Student'
}]


});

module.exports = mongoose.model('Interview', Interview);