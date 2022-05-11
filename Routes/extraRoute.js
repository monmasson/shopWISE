const express = require('express');
const extraRouter = express.Router();
const Extra = require('../Model/extraSchema');
const Product = require('../Model/productSchema');

extraRouter.post('/', (req, res) => {
  const extraData = req.body; // sets the body to a variable
  Extra.create(extraData, (error, createdExtra) => { // creates an extra using the data from the body

    // ----------------------

    if (error) {
      console.error(error);
      res.status(400).json({ // error handling magic
        error: 'could not create!'
      })

      // ----------------------

    } else {
      Product.updateOne({ // updates the product with the id in the body
        _id: extraData.product
      }, {
        extra_info: createdExtra._id // updates the extra_info field to have the id of the extra we just created
      }, (error, updatedProduct) => {

        // --------------------------

        if (error) {
          console.error(error);
          res.status(400).json({ // more error handling magic
            error: 'Could not update Product'
          })

          // ------------------------

        } else {
          console.log('Successfully created Extra and added it to product thing')
          res.status(201).json({
            message: 'Successfully created extra!', // sends back a 201 when it is done with both operations
            extra: createdExtra
          });
        }
      });
    }
  });
});

module.exports = extraRouter;