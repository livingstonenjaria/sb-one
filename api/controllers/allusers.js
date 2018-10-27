const User = require('../models/user');
exports.users_get_all = (req, res, next) => {
  User.find()
    .select('firstname lastname phone _id email created_at role')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            name: doc.name,
            phone: doc.phone,
            email: doc.email,
            role: doc.role,
            created_at: doc.created_at,
            id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/api/v1/user/' + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
