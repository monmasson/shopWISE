// FOLLOW Index -- Delete -- Update -- Create -- Show . ==> LESS ERRORS


///////////////
// CONSTANTS //
///////////////
const express = require('express');
const productRoute = express.Router();
const Product = require('../Model/productSchema');
const User = require('../Model/userSchema');


// INDEX ROUTE (get all the list of products)

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


// ROUTE TO DELETE A PRODUCT

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
      res.status(204).json({}); // sends back 204 to indicate that the product was removed!
    }
  })
});

productRoute.delete('/:id', (req, res) => {
  Product.deleteOne({ // delete a product
    _id: req.params.productId // with the id specified in the request
  }, (error, deletedProduct) => {

    if (error) {
      console.error(error)

      res.status(404).json({
        error: 'No Product found to delete with that id'
      })

    } else {
      /*User.updateOne({ // updates the user
        _id: req.params.userId // with the id specified in the request
      }, {
        $pull: {
          bought_products: req.params.productId // removes the product with the id in the request from the sold_products array
        }
      }, (error, updatedUser) => {
        
        
        if (error) {
          res.status(404).json({
            error: 'No user found with that id'
          })
 
        } else {*/
      res.status(204).json({}); // sends back 204 to indicate that the product was removed!
    }
  })
})
// })
//})





// ROUTE TO UPDATE A PRODUCT    //SUCCESS WORKS!!!!
productRoute.put("/:id", (req, res) => {
  const id = req.params.id
  const updatedProduct = req.body

  Product.updateOne({ _id: id }, updatedProduct, { new: true }, (err, updatedProduct) => {
    if (err) {
      res.status(404).json({ message: err.message })
    } else {
      res.status(202).json(updatedProduct)
    }
  })
})







//ROUTE TO CREATE A PRODUCT 
productRoute.post('/', (req, res) => {
  const productData = req.body
  Product.create(productData, (error, createdProduct) => {

    if (error) {
      console.error(error)
      res.status(400).json({
        error: 'an error has occurred creating the product'
      })



    } else {

      /*User.updateOne({ // updates the user that bought the product 
             _id: productData.seller // id of the seller from the product info
         }, {
             $push: {
                 bought_products: createdProduct._id // pushes the created product's id into the buyer's bought_products array
             }
         }, (error, updatedUser) => {
             if (error) {
             
                 res.status(400).json({
                     error: 'an error has occurred updating the user'
                 })

             } else { */ // This would be the original route if not updating the user.
      res.status(201).json({
        message: "successfully created product",
        product: createdProduct
      })
    }
  })

})


//ROUTE TO SHOW A PRODUCT (with specific id) /// SUCCESS /// WORKS!!!!
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


module.exports = productRoute;