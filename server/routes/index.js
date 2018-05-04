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
  },
  tls: {
    rejectUnauthorized: false
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

  upsert({"password":password},{"email":userMail}, function(err,data){
    if(!err){
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send("Registered Sucessfully");

    }
    else{
      res.send("Not a enrolled user")
    }
  });

});

app.post('/newregister', (req, res)=> {
  var userMail = req.body.mail;
  var batch = req.body.batch;
  var username = req.body.username;
  var phone = req.body.phone;
	mailOptions.to='kvk.reu@gmail.com';
	var password = generator.generate({
    	length: 10,
    	numbers: true
	});
	mailOptions.text=" UserName  :  "+username+"\n\nEmail : "+userMail+"\n\nBatch : "+batch+"\n\nPhone : "+phone+"\n\nPassword : "+password;
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  upsert1({"password":password,"batch":batch,"username":username,"phone":phone},{"email":userMail},function(err,data){
    if(!err){
      res.send("Registered Sucessfully");
    }
    else{
      res.send("Not registered");
    }
  });
  
  
});

app.get('/login', (req, res)=> {
  console.log("Inside Login API");
   let email = req.query.mail;
   let password = req.query.password;
   comparePassword({"password":password}, {email:email}, function(err,data){
     if(!err){
       console.log(data.username);
       res.send(data);       
     }
     else{
       res.send("Invalid Login Details");
     }
    });
 });

 app.post('/changepassword', (req,res)=>{
   console.log("Inside change password");
   let email = req.body.mail;
   let password=req.body.password;
   console.log(password);
   updatePassword({"password":password},{"email":email})
   res.send("Password uploaded Successfully");
 });

 app.post('/updatevalues', (req,res)=>{
    console.log("updating values");
    let email = req.body.data.email;
    updateDB(req.body.data,{"email":email},function(err,data){
        if(!err){
          res.send(data);
        }
        else{
          res.send("Values not updated");
        }
    });
    
 });

 app.get('/getalbums',(req,res)=>{
    console.log("get pics");
    let batch = req.query.batch;
    let username = req.query.username;
    let attend_event = req.query.attend_event;
    getphotos({"batch":batch},{"username":username},attend_event,function(err,data){
      if(!err){
        res.send(data)
      }
      else{
        res.send(err)
      }
    });
 });

 app.get('/getalldetails',(req,res) =>{
   getAllRecords(function(err,data){
      if(!err){
        res.send(data)
      }
      else{
        res.send(err)
      }
   });
 });

};

function upsert(values, condition,cb) {
    return userModal
        .findOne({ where: condition })
        .then(function(obj) {
            if(obj) { // update
                obj.update(values);
                cb(null, "Sucessfully registered");
            }
            else { // insert
                cb("Not an enrolled user");
            }
        })
        .catch(function(err){
          cb("Not an enrolled user");
        });
 }

function upsert1(values, condition,cb) {
  console.log(values);
    return userModal
        .findOne({ where: condition })
        .then(function(obj) {
            if(obj) { // update
              obj.update(values);
              cb(null, "Sucessfully registered");
            }
            else { // insert
                return userModal
                       .create({
                                email: condition.email,
                                password: values.password,
                                username: values.username,
                                batch: values.batch,
                                phone: values.phone
                              })
                        .then(function(res){
                          cb(null, "Registered Sucessfully");
                        })
                        .catch(function(err){
                          cb("Not registered");
                        });
            }
        })
 }

function comparePassword(values,condition,cb){
  return userModal
      .findOne({ where: condition })
      .then(function(obj) {
        if(obj){
          JSON.stringify(obj);
          console.log(obj.password);
          if(obj.password === values.password){
            cb(null, obj);
          }
          else{
            cb("Invalid Details");
          }
        }
        else{
          cb("Invalid Details");
        }
      })
      .catch(function(err){
        console.log(err);
        cb(err);
      });
}

function updatePassword(values,condition){
  return userModal
      .findOne({ where: condition })
      .then(function(obj) {
        if(obj){
          return obj.update(values);
        }
      })
      .catch(function(err){
        console.log(err);
      });
}

function updateDB(data,condition,cb){
  console.log(data);
  var values = {"country":data.country,"city":data.city,"username":data.name,"batch":data.batch,"description":data.description,"profile_photo":data.profile_photo,"attend_event":data.attend_event,"meal_preference":data.meal_preference,"t_shirt_size":data.t_shirt_size,"spouse":data.spouse,"family_members":data.family_members,"paid_via":data.paid_via,"confirmation_code":data.confirmation_code,"contribution_amount":data.contribution_amount,"payment_date":data.payment_date,"album_imgs":data.album_imgs}
  console.log(values);
  return userModal
  .findOne({ where: condition })
  .then(function(obj) {
    if(obj){
      
      obj.update(values);
      cb(null, obj);
    }
  })
  .catch(function(err){
    console.log(err);
    cb(error)
  }); 
}

function getphotos(batch, username,attend_event,cb){
  console.log(batch.batch);
  console.log(username.username);
  if(batch.batch  && username.username && attend_event ){
      return userModal
      .findAll({ where:{
        "batch":batch.batch,
        "username": username.username,
        "attend_event": attend_event
      }})
      .then(function(obj){
        cb(null,obj);
      })
      .catch(function(error){
        cb(error)
      });
  }
  else if(batch.batch  && username.username){
      return userModal
      .findAll({ where:{
        "batch":batch.batch,
        "username": username.username,
      }})
      .then(function(obj){
        console.log("1");
        cb(null,obj);
      })
      .catch(function(error){
        cb(error)
      });
  }
  if(batch.batch  &&  attend_event ){
    return userModal
    .findAll({ where:{
      "batch":batch.batch,
      "attend_event": attend_event
    }})
    .then(function(obj){
      console.log("1");
      cb(null,obj);
    })
    .catch(function(error){
      cb(error)
    });
  }
  if(username.username && attend_event ){
    return userModal
    .findAll({ where:{
      "username": username.username,
      "attend_event": attend_event
    }})
    .then(function(obj){
      console.log("1");
      cb(null,obj);
    })
    .catch(function(error){
      cb(error)
    });
  }
  else if(batch.batch){
    return userModal
    .findAll({ where:{
      "batch":batch.batch
    }})
    .then(function(obj){
      console.log(obj);
      cb(null,obj);
    })
    .catch(function(error){
      cb(error)
    });
  }
  else if(username.username){
    return userModal
    .findAll({ where:{
      "username":username.username
    }})
    .then(function(obj){
      console.log("3");
      cb(null,obj);
    })
    .catch(function(error){
      cb(error)
    });
  } 
}

function getAllRecords(cb){
  return userModal
  .findAll()
  .then(function(obj){
    cb(null,obj);
  })
  .catch(function(err){
    cb(err);
  });
}