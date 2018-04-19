const userController = require('../controllers').User;
const userModal = require('../models').User;
const generator = require('generate-password');
const nodemailer = require('nodemailer');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'KvK.reu@gmail.com',
    pass: 'kvkreu2018'
  }
});

var mailOptions = {
  from: 'KvK.reu@gmail.com',
  to: '',
  subject: 'Login Credentials for KVK',
  text: ''
};

//api for Registering the user
app.post('/register', (req, res)=> {
	var userMail = req.body.mail;
	mailOptions.to=userMail; 
	var password = generator.generate({
    	length: 10,
    	numbers: true
	});
	mailOptions.text=" UserName:  "+userMail+"\npassword:  "+password;
	console.log(mailOptions);
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
  upsert({"password":password},{"name":userMail})
	res.send('Successfully registeres user'+userMail);
})

};


function upsert(values, condition) {
    return userModal
        .findOne({ where: condition })
        .then(function(obj) {
            if(obj) { // update
                return obj.update(values);
            }
            else { // insert
                return userModal
                       .create({
                                name: condition.name,
                                password: values.password
                              })
          .then(User => res.status(201).send(User))
          .catch(error => res.status(400).send(error));
            }
        })
    }
