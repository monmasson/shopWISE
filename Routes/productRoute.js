// FOLLOW Index -- Delete -- Update -- Create -- Show . ==> LESS ERRORS


///////////////
// CONSTANTS //
///////////////
const express = require('express');
const productRoute = express.Router();
const Product = require('../Model/productSchema');
const User = require('../Model/userSchema');



//////////// INDEX ROUTE (get all the list of products) //SUCCESS //WORKS!!!!/////////////////////////

productRoute.get("/", (req, res) => {
  Product.find({}, (error, allProducts) => {
    if (error) {
      console.error(error);
      res.json({
        error: 'an error has occurred'
      });
    } else {
      console.log('success!')
      res.json({
        message: 'Success!',
        products: allProducts
      });
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////


////////////// ROUTE TO DELETE A PRODUCT // SUCESS ///WORKS!!!!! ///////////////////////////////////////

productRoute.delete('/:id', (req, res) => {
  Product.deleteOne({ // delete a product
    _id: req.params.productId // with the id specified in the request
  }, (error, deletedProduct) => {

    if (error) {
      console.error(error)

      res.status(404).json({
        error: 'No User found to delete with that id'
      })

    } else {
      res.status(204).json({}); // sends back 204 on terminal to indicate that the product was removed!
    }
  })
});
///////////////////////////////////////////////////////////////////////////////////////////////////////


//////ROUTE TO CREATE A PRODUCT  // SUCCESS WORKS!!!!    =>>> NEED TO ADD EXTRA FEATURES AND TEST///////
productRoute.post('/', (req, res) => {
  const productData = req.body
  Product.create(productData, (error, createdProduct) => {

    if (error) {
      console.error(error)
      res.status(400).json({
        error: 'an error has occurred creating the product'
      })
    } else {
      //console.log('created product successfully');
      res.status(201).json({
        message: 'Created Successfully',
        user: createdProduct
      })
    }
  })
})
///////////////////////////////////////////////////////////////////////////////////////////////


/////////////// ROUTE TO UPDATE PRODUCT WITH SPECIFIC ID. //////////////////////////////////////
productRoute.put("/:id", (req, res)=>{
  const id = req.params.id
  const updatedProduct = req.body

  Product.updateOne({_id:id}, updatedProduct, {new: true},(err, updatedProduct)=>{
      if(err){
          console.error(error)
          res.status(404).json({message: err.message})
      } else {
          res.status(202).json(updatedProduct)
      }
  })
})
//////////////////////////////////////////////////////////////////////////////////////////////




////////////ROUTE TO SHOW A PRODUCT (with specific id) /// SUCCESS /// WORKS!!!!///////////////
productRoute.get("/show/:id", (req, res) => {
  const id = req.params.id
  Product.find({ _id: id }, (error, foundProduct) => {
    if (error) {
      console.error(error);
      res.json({
        error: 'an error has occurred'
      });
    } else {
      console.log('success!')
      res.status(200).json(foundProduct);
    };
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = productRoute;

