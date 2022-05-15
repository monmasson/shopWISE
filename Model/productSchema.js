// Import mongoose
const mongoose = require ("mongoose");
const { Schema } = require("mongoose"); //("../Model/extraSchema");

// create NEW SCHEMA
    const productSchema = new mongoose.Schema ({
       title:{type:String, required:true },
       sku:{type: String, required:true},
       img:{type: String, required:true},
       instructions :{type:String, required:true },
       conditionsUsed: {type:String},
       availability: { type: Boolean, required: true, default: true },
       noinStock :{type:Number},// $inc look up for a route. update 
       size:{type:String, required:true },
       gender:{type:String},
       pricing:{ type: Number, required: true, min: 0 },
       buyers: [{ type: Schema.Types.ObjectId, ref: 'User', }],//One to Many relationship
       extra: {type: Schema.Types.ObjectId, ref: 'Extra'},
       favorite_users: [
        { type: Schema.Types.ObjectId, ref: 'User' } // Many to Many Relationship
      ]

 });

 const Product = mongoose.model('product', productSchema);

module.exports = Product;