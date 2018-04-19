const User = require('../models').User;

module.exports = {
  create(req, res) {
  	console.log("user details is..."+req.body.password)
    return User
      .create({
        name: req.body.name,
        password: req.body.password
      })
      .then(User => res.status(201).send(User))
      .catch(error => res.status(400).send(error));
  },
};