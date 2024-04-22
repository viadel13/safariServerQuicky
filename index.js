const express = require('express');
const cors = require('cors');
const safariRoute = require('./routes/safari.route.js');
const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.use(express.static('public'))


require('dotenv').config();

const port = process.env.PORT || 5000;

app.use('/', safariRoute);

app.listen(port, ()=>{
    console.log(`le serveur est lance sur le port ${port}`)
})