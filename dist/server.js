!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=3)}([function(e,n,t){"use strict";(function(e,n){var r=t(10),o=function(e){return e&&e.__esModule?e:{default:e}}(r),a=t(14),s=t(18),u=t(19),i=s.basename(e.filename),c=t(8).production,l={},d=void 0;d=c.use_env_variable?new u(process.env[c.use_env_variable]):new u(c.database,c.username,c.password,c),a.readdirSync(n).filter(function(e){return 0!==e.indexOf(".")&&e!==i&&".js"===e.slice(-3)}).forEach(function(e){var t=d.import(s.join(n,e));l[t.name]=t}),(0,o.default)(l).forEach(function(e){l[e].associate&&l[e].associate(l)}),l.sequelize=d,l.Sequelize=u,e.exports=l}).call(n,t(7)(e),"/")},function(e,n,t){"use strict";var r=t(13),o=(t(16),t(11)),a=t(12),s=r();s.use(a()),s.use(o.urlencoded({extended:!1})),s.use(o.json()),t(6)(s),s.get("*",function(e,n){return n.status(200).send({message:"Welcome to the beginning of nothingness."})}),e.exports=s},function(e,n){e.exports=require("http")},function(e,n,t){const r=t(2),o=t(1),a=parseInt(process.env.PORT,10)||8e3;o.set("port",a),r.createServer(o).listen(a)},function(e,n,t){"use strict";var r=t(5);e.exports={User:r}},function(e,n,t){"use strict";var r=t(0).User;e.exports={create:function(e,n){return r.create({email:e.body.email,password:e.body.password,batch:e.body.batch,username:e.body.username,phone:e.body.phone}).then(function(e){return n.status(201).send(e)}).catch(function(e){return n.status(400).send(e)})}}},function(e,n,t){"use strict";function r(e,n,t){return f.findOne({where:n}).then(function(n){n?(n.update(e),t(null,"Sucessfully registered")):t("Not an enrolled user")}).catch(function(e){t("Not an enrolled user")})}function o(e,n,t){return f.findOne({where:n}).then(function(r){if(!r)return f.create({email:n.email,password:e.password,username:e.username,batch:e.batch,phone:e.phone}).then(function(e){t(null,"Registered Sucessfully")}).catch(function(e){t("Not registered")});r.update(e),t(null,"Sucessfully registered")})}function a(e,n,t){return f.findOne({where:n}).then(function(n){n?((0,d.default)(n),console.log(n.password),n.password===e.password?t(null,n):t("Invalid Details")):t("Invalid Details")}).catch(function(e){t(e)})}function s(e,n){return f.findOne({where:n}).then(function(n){if(n)return n.update(e)}).catch(function(e){console.log(e)})}function u(e,n,t){var r={};return r=e.payment_date?{country:e.country,city:e.city,username:e.name,batch:e.batch,description:e.description,profile_photo:e.profile_photo,attend_event:e.attend_event,meal_preference:e.meal_preference,spouse:e.spouse,family_members:e.family_members,paid_via:e.paid_via,confirmation_code:e.confirmation_code,contribution_amount:e.contribution_amount,payment_date:e.payment_date,album_imgs:e.album_imgs}:{country:e.country,city:e.city,username:e.name,batch:e.batch,description:e.description,profile_photo:e.profile_photo,attend_event:e.attend_event,meal_preference:e.meal_preference,spouse:e.spouse,family_members:e.family_members,paid_via:e.paid_via,confirmation_code:e.confirmation_code,contribution_amount:e.contribution_amount,album_imgs:e.album_imgs},f.findOne({where:n}).then(function(e){e&&(e.update(r),t(null,e))}).catch(function(e){t(error)})}function i(e,n,t,r){return e.batch&&n.username&&t?f.findAll({where:{batch:e.batch,username:n.username,attend_event:t}}).then(function(e){r(null,e)}).catch(function(e){r(e)}):e.batch&&n.username?f.findAll({where:{batch:e.batch,username:n.username}}).then(function(e){r(null,e)}).catch(function(e){r(e)}):e.batch&&t?f.findAll({where:{batch:e.batch,attend_event:t}}).then(function(e){r(null,e)}).catch(function(e){r(e)}):n.username&&t?f.findAll({where:{username:n.username,attend_event:t}}).then(function(e){r(null,e)}).catch(function(e){r(e)}):e.batch?f.findAll({where:{batch:e.batch}}).then(function(e){r(null,e)}).catch(function(e){r(e)}):n.username?f.findAll({where:{username:n.username}}).then(function(e){r(null,e)}).catch(function(e){r(e)}):t?f.findAll({where:{attend_event:t}}).then(function(e){r(null,e)}).catch(function(e){r(e)}):void 0}function c(e){return f.findAll().then(function(n){e(null,n)}).catch(function(n){e(n)})}var l=t(9),d=function(e){return e&&e.__esModule?e:{default:e}}(l),f=(t(4).User,t(0).User),p=t(15),m=t(17);e.exports=function(e){e.get("/api",function(e,n){return n.status(200).send({message:"Welcome to the Todos API!"})});var n=m.createTransport({service:"gmail",auth:{user:"KvK.reu@gmail.com",pass:"kvkreu2018"},tls:{rejectUnauthorized:!1}}),t={from:"KvK.reu@gmail.com",to:"",subject:"Login Credentials for KVK",text:""};e.post("/register",function(e,o){var a=e.body.mail;t.to=a;var s=p.generate({length:10,numbers:!0});t.text="UserName:  "+a+"\npassword:  "+s,console.log(t),r({password:s},{email:a},function(e,r){e?o.send("Not a enrolled user"):(n.sendMail(t,function(e,n){e?console.log(e):console.log("Email sent: "+n.response)}),o.send("Registered Sucessfully"))})}),e.post("/newregister",function(e,r){var a=e.body.mail,s=e.body.batch,u=e.body.username,i=e.body.phone;t.to="kvk.reu@gmail.com";var c=p.generate({length:10,numbers:!0});t.text="UserName  :  "+u+"\n\nEmail : "+a+"\n\nBatch : "+s+"\n\nPhone : "+i+"\n\nPassword : "+c,n.sendMail(t,function(e,n){e?console.log(e):console.log("Email sent: "+n.response)}),o({password:c,batch:s,username:u,phone:i},{email:a},function(e,n){e?r.send("Not registered"):r.send("Registered Sucessfully")})}),e.get("/login",function(e,n){var t=e.query.mail;a({password:e.query.password},{email:t},function(e,t){e?n.send("Invalid Login Details"):n.send(t)})}),e.post("/changepassword",function(e,n){var t=e.body.mail;s({password:e.body.password},{email:t}),n.send("Password uploaded Successfully")}),e.post("/updatevalues",function(e,n){var t=e.body.data.email;u(e.body.data,{email:t},function(e,t){e?n.send("Values not updated"):n.send(t)})}),e.get("/getalbums",function(e,n){i({batch:e.query.batch},{username:e.query.username},e.query.attend_event,function(e,t){e?n.send(e):n.send(t)})}),e.get("/getalldetails",function(e,n){c(function(e,t){e?n.send(e):n.send(t)})})}},function(e,n){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,n){e.exports={development:{username:"postgres",password:"postgres",database:"KVK",host:"localhost",dialect:"postgres"},test:{username:"root",password:null,database:"database_test",host:"127.0.0.1",dialect:"postgres"},production:{username:"igbowcdjeurhgd",password:"e896caf072dfa8685ba083ac72e5352570368cd0bf2ee383eded31a05b47d931",database:"d2k6ajc030e3lm",host:"ec2-23-23-180-121.compute-1.amazonaws.com",dialect:"postgres"}}},function(e,n){e.exports=require("babel-runtime/core-js/json/stringify")},function(e,n){e.exports=require("babel-runtime/core-js/object/keys")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("cors")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("generate-password")},function(e,n){e.exports=require("morgan")},function(e,n){e.exports=require("nodemailer")},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("sequelize")}]);