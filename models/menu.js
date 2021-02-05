const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Menu Schema
const menuSchema = new Schema({
    menuName: { type: String, required: true },
    description:{type:String},
    items : [{
      name: { type: String, /*required: true*/ },
      price: { type: Number,  /*required: true*/ },
      desc: String,
      hidden: Boolean
    }],
    group: String,
    createdAt:{ type:Date,
      default: Date.now
    },
    //created_By: reference to User logged
  });

module.exports = mongoose.model('Menu',menuSchema);