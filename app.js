const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up the express app
const app = express();
app.use(cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


require('./server/routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports=app;
//app.listen(process.env.PORT||8010);