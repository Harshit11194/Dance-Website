const express = require('express');
const path = require('path');
const hostname = '127.0.0.1';
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
const port = 8000;

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc1: String
  });

const Contact = mongoose.model('Contact', contactSchema);


app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('index.pug', params);
})

app.get('/home', (req, res)=>{
    const params = { }
    res.status(200).render('index.pug', params);
})

app.get('/home', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This Item has been saved to the DataBase")
    }).catch(()=>{
        res.status(400).send("The Item was not saved to the DataBase")
    })
    // res.status(200).render('contact.pug');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });