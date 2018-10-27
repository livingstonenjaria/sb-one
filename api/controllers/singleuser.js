const User = require('../models/user');
exports.user_get_single_user = (req, res, next) => {
  const id = req.params.userid;
  User.findById(id)
    .select('firstname lastname phone _id email created_at role')
    .exec()
    .then(doc => {
      res.status(200).json({
        firstname: doc.firstname,
        lastname: doc.lastname,
        phone: doc.phone,
        email: doc.email,
        role: doc.role,
        created_at: doc.created_at,
        id: doc._id
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
