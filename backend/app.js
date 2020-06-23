const express = require('express');
const app = express()
const mongoose = require('mongoose')
const PORT =5000
const mongourl = require('./config/key')

mongoose.connect(mongourl,{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err))
require('./Models/user')
require('./Models/health')

app.use(express.json())
app.use(require('./Routes/sign'))
app.use(require('./Routes/healthroutes'))

app.listen(PORT,()=>console.log(`server is listen at`,PORT))