const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const extraSchema = new Schema({
  rating: { type: Number, min: 0, max: 5 },// error handling if time. 
  product: { type: Schema.Types.ObjectId, ref: 'Product' }, //one to one relationship
  recommendBy: { type:Number, min:0 }
})

const Extra = mongoose.model('Extra', extraSchema);

module.exports = Extra;