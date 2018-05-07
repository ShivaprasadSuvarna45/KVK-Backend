const User = require('../models').User;

module.exports = {
  create(req, res) {
    return User
      .create({
        email: req.body.email,
        password: req.body.password,
        batch: req.body.batch,
        username: req.body.username,
        phone:req.body.phone
      })
      .then(User => res.status(201).send(User))
      .catch(error => res.status(400).send(error));
  },
};
