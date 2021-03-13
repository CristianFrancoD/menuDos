const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Menu Schema
const menuSchema = new Schema({
    menuName: { type: String, required: true },
    description:{type:String},
    items : [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
    ],
    group: String,
   
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
    
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Menu',menuSchema);