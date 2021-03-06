const express = require('express');
const app = express();

const users = require('./routes/users');
const api = require('./routes/features');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/api/users', users);
app.use('/api', api);

app.listen(3000);

module.exports = app;
