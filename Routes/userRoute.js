// FOLLOW Index -- Delete -- Update -- Create -- Show . ==> LESS ERRORS

///////////////
// CONSTANTS //
///////////////
const express = require('express');
const userRoute = express.Router();
const User = require('../Model/userSchema');
const Product = require('../Model/productSchema');
const Extra = require('../Model/extraSchema');


////////ROUTE FOR INDEX (SHOWS THE LIST OF ALL USERS)  /// SUCCESS//// WORKS!/////////////////////////
userRoute.get("/", (req, res) => {
    User.find({},(error,allUsers)=>{
        if (error){
            console.error(error);
            res.json({
                error:'an error has occurred'
            });
        } else {
            console.log('success!')
            res.json({message: 'Success!',
            users: allUsers
           });
        }
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////



////////////// DELETE ROUTE FOR USER WITH THAT ID // SUCCESS//WORKS//////////////////////////////
userRoute.delete('/:id', (req, res) => {
    User.deleteOne({ // delete a product
      _id: req.params.userId // with the id specified in the request
    }, (error, deletedUser) => {

   if (error) {
     console.error(error)
        
        res.status(404).json({
          error: 'No User found to delete with that id'
        })
        
      } else {res.status(204).json({}); // sends back 204 to indicate that the product was removed!
    }
  })
});
//////////////////////////////////////////////////////////////////////////////////////////////////////



////////////ROUTE TO UPDATE A USER WITH THAT ID // SUCCESS /// WORKS!!!!!!!////////////////////////////
  userRoute.put("/:id", (req, res)=>{
    const id = req.params.id
    const updatedUser = req.body

    User.updateOne({_id:id}, updatedUser, {new: true},(err, updatedUser)=>{
        if(err){
            console.error(error)
            res.status(404).json({message: err.message})
        } else {
            res.status(202).json(updatedUser)
        }
    })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////


////////////// ROUTE TO CREATE A USER  /// SUCCESS WORKS!!!!////////////////////////////////////////

userRoute.post('/', (req, res) => {
   // console.log(req.body)//troubleshooting
    const userData = req.body
    User.create(userData, (error, createdUser) => {
      if (error) {  //error first
        console.error(error);
        res.status(400).json({
          error: 'an error has occurred'
        })
      } else {
        //console.log('created user successfully');
        res.status(201).json({
          message: 'Created Successfully',
          user: createdUser
        })
      }
    })
  })
  /////////////////////////////////////////////////////////////////////////////////////////////////


  ///////ROUTE TO SHOW A USER (with specific id) /// SUCCESS /// WORKS!!!!/////////////////////////
  userRoute.get("/show/:id", (req, res) => {
    const id = req.params.id
    User.find({_id:id} ,(error, foundUser)=>{
        if (error){
            console.error(error);
            res.json({
                error:'an error has occurred'
            });
        } else {
            console.log('success!')
            res.status(200).json(foundUser);
           };
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////ROUTE FOR EXTRA FEATURES ADD PRODUCT TO USER'S PURCHASE HISTORY///////////////////////////////////////////////
userRoute.put("/:productId/:userId", (req, res)=>{
   
    User.updateOne({ // updates the user that bought the product 
             _id: req.params.userId // id of the buyer from the product info
         }, {
             $push: {
                 bought_products: req.params.productId // pushes the created product's id into the buyer's bought_products array
             }
         }, (error, updatedUser) => {
             if (error) {
             
                 res.status(400).json({
                     error: 'an error has occurred updating the user'
                 })
                

             } else { 
      res.status(201).json({
        message: "successfully added the product to user",
        user: updatedUser
        // make update route for product. 

        
        // update the number of products in stock. 
      })
    }
  })
});
///////////////////////////////////////////////////////////////////////////////////////////////////////



  
  module.exports = userRoute;
