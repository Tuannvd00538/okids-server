'use strict';
const express = require('express');
var multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var rootRoute = require('./routes/rootRoute');
rootRoute(app);

app.get('/', (req, res) => res.send('Access denied.'));
app.listen(port, function() {
    console.log(`Port: ${port} server start success!`);
});