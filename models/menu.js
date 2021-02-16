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
   
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
    //created_By: reference to User logged
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Menu',menuSchema);