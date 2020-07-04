const express = require('express');
const app = express();
const engines = require('consolidate');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const mongourl = require('./config/key');
const PORT = 5000;
const passenger = require('./Models/passenger');

mongoose
  .connect(mongourl.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log(err));
require('./Models/user');
require('./Models/health');
require('./Models/passenger');
require('./Models/driver');

app.engine('ejs', engines.ejs);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(express.json());
app.use(require('./Routes/sign'));
app.use(require('./Routes/healthroutes'));
app.use(require('./Routes/stripe'));
app.use(express.json());
app.use(require('./Routes/sign'));
app.use(require('./Routes/healthroutes'));
app.use(require('./Routes/addRoute'));
app.use(require('./Routes/searchRoute'));
app.listen(PORT, () => console.log(`server is listen at`, PORT));
