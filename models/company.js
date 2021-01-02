const mongoose = require('mongoose');


//Company Schema
const companySchema = new Schema({
    companyName:{type:String, required: true},
    social_reason:{type:String, required:true},
    address: {type:String}
    //created_By: reference to User logged
  
  });



const Company = module.exports = mongoose.model("Company",companySchema);
