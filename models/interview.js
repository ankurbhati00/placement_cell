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
student:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Student'
}]


});

module.exports = mongoose.model('Interview', Interview);