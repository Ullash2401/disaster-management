const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({

  firstName:{
    type:String,
    required:true
  },

  lastName:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true
  },

  phone:String,

  country:String,

  amount:{
    type:Number,
    required:true
  },

  disasterType:{
    type:String,
    required:true
  },

  paymentMethod:{
    type:String,
    required:true
  },

  anonymous:{
    type:Boolean,
    default:false
  },

  message:String,

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("Donation", donationSchema);