const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//User Schema
const userSchema = new Schema({
    email: {type:String, required:true},
    password: {type:String, required:true},
    menus: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }
    ]
  },{
    timestamps: true
  });

module.exports = mongoose.model("User", userSchema);
  