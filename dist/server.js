!function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=6)}([function(e,n){e.exports=require("path")},function(e,n,t){"use strict";(function(n,o){var r=t(11),s=function(e){return e&&e.__esModule?e:{default:e}}(r),a=t(12),u=t(0),i=t(15),c=u.basename(n),l=t(9).production,d={},f=void 0;f=l.use_env_variable?new i(process.env[l.use_env_variable]):new i(l.database,l.username,l.password,l),a.readdirSync(o).filter(function(e){return 0!==e.indexOf(".")&&e!==c&&".js"===e.slice(-3)}).forEach(function(e){var n=f.import(u.join(o,e));d[n.name]=n}),(0,s.default)(d).forEach(function(e){d[e].associate&&d[e].associate(d)}),d.sequelize=f,d.Sequelize=i,console.log(d.sequelize.config),e.exports=d}).call(n,"/index.js","/")},function(e,n,t){"use strict";function o(e,n,t){return f.findOne({where:n}).then(function(n){n?(n.update(e),t(null,"Sucessfully registered")):t("Not an enrolled user")}).catch(function(e){t("Not an enrolled user")})}function r(e,n,t){return f.findOne({where:n}).then(function(o){if(!o)return f.create({email:n.email,password:e.password,username:e.username,batch:e.batch,phone:e.phone}).then(function(e){t(null,"Registered Sucessfully")}).catch(function(e){t("Not registered")});o.update(e),t(null,"Sucessfully registered")})}function s(e,n,t){return f.findOne({where:n}).then(function(n){n?((0,d.default)(n),console.log(n.password),n.password===e.password?t(null,n):t("Invalid Details")):t("Invalid Details")}).catch(function(e){t(e)})}function a(e,n){return f.findOne({where:n}).then(function(n){if(n)return n.update(e)}).catch(function(e){console.log(e)})}function u(e,n,t){var o={country:e.country,city:e.city,username:e.name,batch:e.batch,description:e.description,profile_photo:e.profile_photo,attend_event:e.attend_event,meal_preference:e.meal_preference,spouse:e.spouse,family_members:e.family_members,paid_via:e.paid_via,confirmation_code:e.confirmation_code,contribution_amount:e.contribution_amount,payment_date:e.payment_date,album_imgs:e.album_imgs};return f.findOne({where:n}).then(function(e){e&&(e.update(o),t(null,e))}).catch(function(e){t(error)})}function i(e,n,t,o){return e.batch&&n.username&&t?f.findAll({where:{batch:e.batch,username:n.username,attend_event:t}}).then(function(e){o(null,e)}).catch(function(e){o(e)}):e.batch&&n.username?f.findAll({where:{batch:e.batch,username:n.username}}).then(function(e){o(null,e)}).catch(function(e){o(e)}):e.batch&&t?f.findAll({where:{batch:e.batch,attend_event:t}}).then(function(e){o(null,e)}).catch(function(e){o(e)}):n.username&&t?f.findAll({where:{username:n.username,attend_event:t}}).then(function(e){o(null,e)}).catch(function(e){o(e)}):e.batch?f.findAll({where:{batch:e.batch}}).then(function(e){o(null,e)}).catch(function(e){o(e)}):n.username?f.findAll({where:{username:n.username}}).then(function(e){o(null,e)}).catch(function(e){o(e)}):void 0}function c(e){return f.findAll().then(function(n){e(null,n)}).catch(function(n){e(n)})}var l=t(10),d=function(e){return e&&e.__esModule?e:{default:e}}(l),f=(t(7).User,t(1).User),p=t(13),m=t(14);e.exports=function(e){e.get("/api",function(e,n){return n.status(200).send({message:"Welcome to the Todos API!"})});var n=m.createTransport({service:"gmail",auth:{user:"KvK.reu@gmail.com",pass:"kvkreu2018"},tls:{rejectUnauthorized:!1}}),t={from:"KvK.reu@gmail.com",to:"",subject:"Login Credentials for KVK",text:""};e.post("/register",function(e,r){var s=e.body.mail;t.to=s;var a=p.generate({length:10,numbers:!0});t.text="UserName:  "+s+"\npassword:  "+a,console.log(t),o({password:a},{email:s},function(e,o){e?r.send("Not a enrolled user"):(n.sendMail(t,function(e,n){e?console.log(e):console.log("Email sent: "+n.response)}),r.send("Registered Sucessfully"))})}),e.post("/newregister",function(e,o){var s=e.body.mail,a=e.body.batch,u=e.body.username,i=e.body.phone;t.to="kvk.reu@gmail.com";var c=p.generate({length:10,numbers:!0});t.text="UserName  :  "+u+"\n\nEmail : "+s+"\n\nBatch : "+a+"\n\nPhone : "+i+"\n\nPassword : "+c,n.sendMail(t,function(e,n){e?console.log(e):console.log("Email sent: "+n.response)}),r({password:c,batch:a,username:u,phone:i},{email:s},function(e,n){e?o.send("Not registered"):o.send("Registered Sucessfully")})}),e.get("/login",function(e,n){var t=e.query.mail;s({password:e.query.password},{email:t},function(e,t){e?n.send("Invalid Login Details"):n.send(t)})}),e.post("/changepassword",function(e,n){var t=e.body.mail;a({password:e.body.password},{email:t}),n.send("Password uploaded Successfully")}),e.post("/updatevalues",function(e,n){var t=e.body.data.email;u(e.body.data,{email:t},function(e,t){e?n.send("Values not updated"):n.send(t)})}),e.get("/getalbums",function(e,n){i({batch:e.query.batch},{username:e.query.username},e.query.attend_event,function(e,t){e?n.send(e):n.send(t)})}),e.get("/getalldetails",function(e,n){c(function(e,t){e?n.send(e):n.send(t)})})}},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("cors")},function(e,n){e.exports=require("express")},function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=t(5),s=o(r),a=t(3),u=o(a),i=t(4),c=o(i),l=t(0),d=(o(l),(0,s.default)());d.use((0,c.default)()),d.use(u.default.urlencoded({extended:!1})),d.use(u.default.json()),t(2)(d),d.get("*",function(e,n){return n.status(200).send({message:"Welcome to the beginning of nothingness."})}),d.listen(process.env.PORT||8e3)},function(e,n,t){"use strict";var o=t(8);e.exports={User:o}},function(e,n,t){"use strict";var o=t(1).User;e.exports={create:function(e,n){return o.create({email:e.body.email,password:e.body.password,batch:e.body.batch,username:e.body.username,phone:e.body.phone}).then(function(e){return n.status(201).send(e)}).catch(function(e){return n.status(400).send(e)})}}},function(e,n){e.exports={development:{username:"postgres",password:"Prasad$hiv45",database:"KVK",host:"localhost",dialect:"postgres"},test:{username:"root",password:null,database:"database_test",host:"127.0.0.1",dialect:"postgres"},production:{username:"igbowcdjeurhgd",password:"e896caf072dfa8685ba083ac72e5352570368cd0bf2ee383eded31a05b47d931",database:"d2k6ajc030e3lm",host:"ec2-23-23-180-121.compute-1.amazonaws.com",dialect:"postgres",protocol:"postgres",port:"5432",native:!0,ssl:!0}}},function(e,n){e.exports=require("babel-runtime/core-js/json/stringify")},function(e,n){e.exports=require("babel-runtime/core-js/object/keys")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("generate-password")},function(e,n){e.exports=require("nodemailer")},function(e,n){e.exports=require("sequelize")}]);