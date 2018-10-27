const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../auth/config/config.json');
const User = require('../models/user');

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Email already exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              phone: req.body.phone,
              email: req.body.email,
              password: hash,
              created_at: Date.now(),
              role: req.body.role
            });
            user
              .save()
              .then(result => {
                const token = jwt.sign(
                  {
                    email: result.email,
                    userId: result._id
                  },
                  config.secret,
                  {
                    expiresIn: '1h'
                  }
                );
                console.log(result);
                res.status(201).json({
                  message: 'User created successfully',
                  id: result._id,
                  token: token
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};
