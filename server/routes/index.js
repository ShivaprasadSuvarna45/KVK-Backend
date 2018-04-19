const userController = require('../controllers').user;
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
	res.send('Successfully registeres user'+userMail);
})


  //api for creating the user
  app.post('/createuser', userController.create);
};