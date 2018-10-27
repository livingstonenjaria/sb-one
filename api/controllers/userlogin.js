const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('basic-auth');
const config = require('../auth/config/config.json');
const User = require('../models/user');
exports.user_login = (req, res, next) => {
  const credentials = auth(req);
  console.log(credentials);
  if (!credentials) {
    res.status(400).json({ message: 'Invalid Request!' });
  } else {
    const email = credentials.name;
    const pass = credentials.pass;
    User.find({ email: email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: 'User does not exist'
          });
        }
        bcrypt.compare(pass, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: err
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              config.secret,
              {
                expiresIn: '1h'
              }
            );
            return res.status(200).json({
              message: 'Auth Successful',
              token: token,
              id: user[0]._id
            });
          } else {
            return res.status(401).json({
              message: 'Password does not match'
            });
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
};
