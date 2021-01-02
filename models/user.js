const mongoose = require('mongoose');
const userSchema = new Schema({
    email: {type:String, required:true},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true}
  });

  const Menu = model.export = mongoose.model("Menu", menuSchema);
  