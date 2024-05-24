const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const safariRoute = require('./routes/safari.route.js');
const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


require('dotenv').config();

const port = process.env.PORT || 5000;

app.use('/', safariRoute);


async function db(){
    try {
     const response = await mongoose.connect(process.env.INFOSDB);
      console.log('connecte');
      app.listen(port, ()=>{
        console.log(`le serveur est lance sur le port ${port}`)
    })
      
    } catch (error) {
      console.log(error)
    }
  }
  
  db();

