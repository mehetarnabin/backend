const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');

const api = process.env.API_URL;

const productSchema = mongoose.Schema({
    name:String,
    image:String,
    countInStock:Number,
})

const Product = mongoose.model('Product', productSchema);

app.get(api+'/products', (req, res) => {
    const product = {
        id: 1,
        name: 'hair dresser',
        image: 'some_url',
    }
    res.send(product);
})

app.post(api+'/products', (req, res) => {
    // const newProduct = req.body;
    // console.log(newProduct);
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock,
    })

    product.save().then((createdProduct=>{
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        console.err;
        success:false
    })
    // res.send(newProduct);
})
 
mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_STRING,  {useNewUrlParser: true})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=>{
    console.log(err);
})

 
app.listen(3000, ()=> {
    console.log(api);
    console.log('server is running http://localhost/3000');
})