require('dotenv').config();
const express = require('express');
const moment = require('moment');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const PORT = process.env.PORT;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const todoRoutes = require('./routes/todo_route');
app.use('/api/v1/todo', todoRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
