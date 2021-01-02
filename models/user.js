const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//User Schema
const userSchema = new Schema({
    email: {type:String, required:true},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true}
  });

module.export = mongoose.model("User", userSchema);
  