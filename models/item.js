const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Items Squema
const itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number,  required: true },
    desc: String,
    hidden: {type:Boolean },
    menu: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Menu' 
    }
},{
    timestamps: true
  });

module.exports = mongoose.model("Item",itemSchema);