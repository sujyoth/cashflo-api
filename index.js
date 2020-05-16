const express = require('express');
const app = express();

const users = require('./routes/users');
const api = require('./routes/features');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send("Hello world!");
});

app.use('/api/users', users);
app.use('/api', api);

app.listen(3000);
