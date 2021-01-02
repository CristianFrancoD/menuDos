const mongoose = require('mongoose');
var Schema = mongoose.Schema;


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

module.exports = mongoose.model('Menu',menuSchema);