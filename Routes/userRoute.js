const express = require('express');
const userRoute = express.Router();
const User = require('../schemas.js/userSchema');
const Product = require('../schemas.js/productSchema');

// ROUTE TO CREATE A USER

userRoute.post('/', (req, res) => {
    const userData = req.body
    User.create(userData, (error, createdUser) => {
      if (error) {
        console.error(error);
        res.status(400).json({
          error: 'an error has occurred'
        })
      } else {
        console.log('created user successfully');
        res.status(201).json({
          message: 'Created Successfully',
          user: createdUser
        })
      }
    })
  })
  
  module.exports = userRoute;
