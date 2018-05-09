import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

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

app.listen(process.env.PORT||8000);