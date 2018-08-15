const express = require('express');
const app = express();

app.use(require('./categoria'));
app.use(require('./producto'));
app.use(require('./marca'));

module.exports = app;