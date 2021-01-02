const mongoose = require('mongoose');

const menuSchema = new Schema({
    Menuname: { type: String, required: true },
    items : [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
      desc: String,
      hidden: Boolean
    }],
    available: Boolean,
    //created_By: reference to User logged
  });

const Menu = module.exports = mongoose.model('Menu',menuSchema);