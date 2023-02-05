const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb')
const mongoose = require('mongoose')

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://admin:navneet@cluster0.s8mk5ia.mongodb.net/?retryWrites=true&w=majority').then((result)=>{
  
  app.listen(3000)
}).catch((err)=>{
  console.log(err)
})