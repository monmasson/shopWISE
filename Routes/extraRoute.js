const express = require('express');
const extraRouter = express.Router();
const Extra = require('../Model/extraSchema');
const Product = require('../Model/productSchema');
const User = require('../Model/userSchema');

////////////////////////////////////////////////////////////////////////////////////////////

extraRouter.post('/', (req, res) => {
  const extraData = req.body; // sets the body to a variable
  Extra.create(extraData, (error, createdExtra) => { // creates an extra using the data from the body

    if (error) {
      console.error(error);
      res.status(400).json({ 
        error: 'could not create!'
      })

    } else {
      Product.updateOne({ // updates the product with the id in the body
        _id: extraData.product
      }, {
        extra: createdExtra._id // updates the extra (in the product schema)field to have the id of the extra we just created
      }, (error, updatedProduct) => {

        // --------------------------

        if (error) {
          console.error(error);
          res.status(400).json({ 
            error: 'Could not update Product'
          })

          // ------------------------

        } else {
          console.log('Successfully created Extra and added it to product ')
          res.status(201).json({
            message: 'Successfully created extra!', 
            extra: createdExtra
          });
        }
      });
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = extraRouter;