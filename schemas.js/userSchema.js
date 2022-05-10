const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  address:{type:String, required:true},
  insurance:{type:Boolean, required:true},
  age:{type:Number, required:true},
  email:{type:String, required:true},
  favorites: [
    { type: Schema.Types.ObjectId, ref: 'Product' } // Many to Many relationship
  ],
  bought_products: [
    { type: Schema.Types.ObjectId, ref: 'Product' } // One to Many Relationship
  ]
})
const User = mongoose.model('User', userSchema);

module.exports = User;