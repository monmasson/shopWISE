// Import mongoose
const mongoose = require ("mongoose");

// create NEW SCHEMA
/*Name:{ type: string, required:true},
Cost:{ type: number, required: true , min cost:}  ,
Image: {type: string, required: true },
Instructions on use: {type: string, required : true }  ,
Conditions to be used for :{ type: string} 
Availability : {type: boolean}
Number in stock :{ type: number} => LOOK UP $inc (INCREMENTS) find=> dset to variable=> update .( $inc-1). If they buy multiples=> find the function. STRETCH GOAL
Size: {type: number}
Gender :{ type: string}*/

    const productSchema = new mongoose.Schema ({
       title:{type:String, required:true },
       sku:{type: String, required:true},
       img:{type: String, required:true},
       instructions :{type:String, required:true },
       conditionsUsed: {type:String},
       availability: { type: Boolean, required: true, default: true },
       noinStock :{type:Number},
       size:{type:Number, required:true },
       gender:{type:String},
       pricing:{ type: Number, required: true, min: 0 },

       /* STRETCH GOALS 
       extra_info: { type: Schema.Types.ObjectId, ref: 'Extra' }, // One to One Relationship
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // One to Many Relationship
  favorite_users: [
    { type: Schema.Types.ObjectId, ref: 'User' } // Many to Many Relationship
  ]*/

 });

 const Product = mongoose.model('Product', productSchema);

module.exports = Product;