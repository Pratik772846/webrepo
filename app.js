//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const bodyparser = require("body-parser")
const ejs = require("ejs");
const _ = require('lodash');
const mysql = require('mysql');
const dotenv = require('dotenv');
const session = require('express-session');
// const ejsLint = require('ejs-lint');
const alert = require('alert');
const grocery = "GROCERY"
const others = "OTHERS"
const kitchen = "DAILY ESSENTIALS"
const confectionery = "CONFECTIONERY"

dotenv.config({ path: './.env' });
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: "secret", resave: false,
  saveUninitialized: true,
}))
let posts = []

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce'
})
db.connect((err) => {
  if (!err) {
    console.log('db connected');
  }
  else {
    console.log(err);
  }
})

app.get('/', function (req, res) {
  res.sendFile('views/index.html', { root: __dirname })
});


// app.get('/getposts',(req,res)=>{
//   let sql = 'SELECT * FROM posts';
//   let query = db.query(sql,(err,result)=>{
//       if(err) throw err;
//       console.log(result);
//       res.send('posts fetched...');
//   })
// })
app.get("/logout", (req, res) => {
  req.session.destroy(function (error) {
    if (error) {
      console.log(error);
      res.send(error)
    }
    else {
      res.redirect('/');
    }
  }



  )


})
app.get('/grocery', (req, res) => {
  let sql = 'SELECT * FROM products WHERE type="grocery"';
  let query = db.query(sql, (err, result) => {
    if (req.session.user) { res.render("grocery", { grocery1: grocery, result: result }); }
    else {
      res.redirect("/");
    }
  })
})
app.get('/admin', (req, res) => {
  res.sendFile('views/signup/admin.html', { root: __dirname })

  app.post("/admin", encoder, function (req, res) {
    // var username = req.body.username;
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "ecommerce"
    });
    var password = req.body.password;
    var email = req.body.email;
    connection.query("select * from admin where   email = ? and password = ?", [email, password], function (error, results, fields) {
      if (results.length > 0) {
        flag = true;
        res.redirect("/adminpage");
      } else {

        alert("You have entered an invalid email or password Please Resister yourself !!! ");
        res.redirect("/admin");
      }
      res.end();
    })
  })
})
app.get('/others', (req, res) => {
  let sql = 'SELECT * FROM products WHERE type="others"';
  let query = db.query(sql, (err, result) => {
    if (req.session.user) { res.render("others", { grocery1: others, result: result }); }
    else {
      res.redirect('/')
    }
  })
})
app.get('/kitchen', (req, res) => {
  let sql = 'SELECT * FROM products WHERE type="DE"';
  let query = db.query(sql, (err, result) => {
    if (req.session.user) { res.render("kitchen", { grocery1: kitchen, result: result }); }
    else {
      res.redirect('/')
    }
  })
})
app.get('/home', function (req, res) {
  if (req.session.user) {
    res.sendFile('views/index2.html', { root: __dirname })
  }
  else {
    res.redirect('/');
  }
});

app.get('/confectionery', (req, res) => {
  let sql = 'SELECT * FROM products WHERE type="confectionary"';
  let query = db.query(sql, (err, result) => {
    if (req.session.user) { res.render("confectionery", { grocery1: confectionery, result: result }); }
    else { res.redirect('/') }
  })
})
app.get('/adminpage', (req, res) => {

  res.render('adminpage');
})
app.get('/adminform', function (req, res) {
  res.sendFile('views/signup/adminform.html', { root: __dirname })

  app.post("/adminform", encoder, function (req, res) {
    // var username = req.body.username;
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "ecommerce"
    });
    const name = req.body.name;
    const price = req.body.price;
    const type = req.body.type;

    const description = req.body.description;
    connection.query('SELECT type FROM products WHERE type = ?', [type], async (error, results) => {
      if (error) { console.log(error) }
      if (results.length > 0) {
        alert("this item is already exist");
        return res.redirect('/adminform')
      }

      connection.query('INSERT INTO products SET ?', { name: name, type: type, description: description, price: price }, (error, results) => {
        if (error)
          console.log(error);
        else {
          alert("Item Listed Successfully");
          return res.redirect("/adminpage");
        }
      })
    })
  })






});
app.get('/request', (req, res) => {
  res.render('request')
  app.post("/request", encoder, function (req, res) {
    // var username = req.body.username;
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "ecommerce"
    });
    const name = req.body.name;
    const description = req.body.description;
    const email = req.body.email;
    connection.query('SELECT email FROM requests WHERE email = ?', [email], async (error, results) => {
      if (error) { console.log(error) }
      if (results.length > 0) {
        alert("you have already posted a query");
        return res.redirect('/request');
      }

      connection.query('INSERT INTO requests SET ?', { name: name, email: email, description: description }, (error, results) => {
        if (error)
          console.log(error);
        else {
          alert("thank you for your query we will list item soon ");
          return res.redirect("/home");
        }
      })
    })
  })







})
const encoder = bodyparser.urlencoded();
app.get('/signin', (req, res) => {
  res.render('signin')

  app.post("/signin", encoder, function (req, res) {
    // var username = req.body.username;
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "ecommerce"
    });
    var password = req.body.password;
    var email = req.body.email;
    connection.query("select * from customer where   email = ? and password = ?", [email, password], function (error, results, fields) {
      if (results.length > 0) {
        flag = true;
        req.session.user = req.body.email;
        res.redirect("/home");
      } else {

        alert("You have entered an invalid email or password Please Signup !!! ");
        res.redirect("/signin");
      }
      res.end();
    })
  })
  app.get("/welcome", function (req, res) {
    res.sendFile(__dirname + "/welcome.html")
  })
})
app.get('/signup', (req, res) => {
  res.render('signup')


  app.post("/signup", encoder, function (req, res) {
    // var username = req.body.username;
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "ecommerce"
    });
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.confirmpassword;
    const address = req.body.address;
    connection.query('SELECT email FROM customer WHERE email = ?', [email], async (error, results) => {
      if (error) { console.log(error) }
      if (results.length > 0) {
        alert("this email is already in use");
        return res.redirect('/signup')
      }
      else if (password !== password2) {
        alert("passwords do not match");
        return res.redirect('/signup')
      }
      connection.query('INSERT INTO customer SET ?', { name: name, email: email, password: password, address: address }, (error, results) => {
        if (error)
          console.log(error);
        else {
          alert("thank you for signing up");
          return res.redirect("/home");
        }
      })
    })
  })
})
app.get('/allrequests', (req, res) => {
  res.render("requests");
})
app.get('/orders', (req, res) => {
  res.render("orders");
})

// add to cart functionality
function isProductInCart(cart, pid) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].pid == pid) {
      return true;
    }
  }
  return false;
}

function calculateTotal(cart, req) {
  total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity)
  }
  req.session.total = total;
  return total;
}

app.post('/add_to_cart', (req, res) => {
  var pid = req.body.pid;
  var name = req.body.name;
  var description = req.body.description;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var product = { pid: pid, name: name, quantity: quantity, description: description, price: price };

  // if(req.session.cart.length ==0){
  //   res.send('Your Cart is Empty...');
  // }
  // else{
  if (req.session.cart) {
    var cart = req.session.cart;
    if (!isProductInCart(cart, pid)) {
      cart.push(product);
    }
  } else {
    req.session.cart = [product];
    var cart = req.session.cart;
  }
  // calculate total
  calculateTotal(cart, req);
  res.redirect('/cart');
  // }
});
const mycart = "YOUR CART";
app.get('/cart', (req, res) => {
  var cart = req.session.cart;
  var total = req.session.total;
  res.render('cart', { cart: cart, total: total });
})

app.post('/remove_product', (req, res) => {
  var pid = req.body.pid;
  var cart = req.session.cart;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].pid == pid) {
      // cart.splice(cart.indexOf(i),1);
      cart.splice(i, 1);
    }
  }

  calculateTotal(cart, req);
  res.redirect('/cart');
})

app.post('/edit_product_quantity', (req, res) => {
  var pid = req.body.pid;
  var quantity = req.body.quantity;
  var increase_btn = req.body.increase_quantity;
  var decrease_btn = req.body.decrease_quantity;

  var cart = req.session.cart;
  if (increase_btn) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].pid == pid) {
        if (cart[i].quantity > 0) {
          cart[i].quantity = parseInt(cart[i].quantity) + 1;
        }
      }
    }
  }
  if (decrease_btn) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].pid == pid) {
        if (cart[i].quantity > 1) {
          cart[i].quantity = parseInt(cart[i].quantity) - 1;
        }
      }
    }
  }
  calculateTotal(cart, req);
  res.redirect('/cart');
})

app.get('/checkout', (req, res) => {
  var total = req.session.total;
  res.render('checkout', { total: total });
})

app.post('/place_order', (req, res) => {
  var name = req.body.name;
  var phone = req.body.phone;
  var hall = req.body.hall;
  var room = req.body.room;
  var total = req.session.total;
  var productid = "";
  var quantity = "";
  var cart = req.session.cart;
  for (let i = 0; i < cart.length; i++) {
    productid = productid + " " + cart[i].pid;
    quantity = quantity + " " + cart[i].quantity;
  }
  console.log(productid);
  console.log(quantity);
  console.log(name);
  console.log(total);
  let post = { name: name, hall: hall, room: room, productid: productid, quantity: quantity, total: total };
  let sql = 'INSERT INTO orders SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    req.session.destroy((err) => {
      // res.redirect('/') 
      res.send('your order has been placed sucessfully....');
    })
    // res.send('your order has been placed sucessfully....');
  })
});

app.post('/add_item', (req, res) => {
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var type = req.body.type;
  console.log(name);
  console.log(price);
  console.log(type);
  let post = { name: name, price: price, description: description, type: type };
  let sql = 'INSERT INTO products SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('your item has been added sucessfully....');
  })
})

app.get('/orders1', (req, res) => {
  let sql = 'SELECT * FROM orders';
  let query = db.query(sql, (err, result) => {
    res.render("orders1", { result: result });
  })
})

app.post('/order_done', (req, res) => {
  let sql = `DELETE FROM orders WHERE oid=${req.body.oid}`;
  let query = db.query(sql, (err, result) => {
    res.redirect('/orders1');
  })
})




//  app.get('/posts/:id',(req,res)=>{
//   let id =_.lowerCase(req.params.id);
//   for(let i=0;i<posts.length;i++){
//     let id1= _.lowerCase(posts[i].title);
//     if(id1===id){
//       // console.log(`match found`);
//       res.render("post",{posot:posts[i]})
//     }
//   }
//  })
//  app.post('/compose',(req,res)=>{
//   const post={
//     title : req.body.compose,
//     body : req.body.content
//   }
//   posts.push(post);
//   // console.log(post);
//   res.redirect('/');

//  })

app.listen(9000, function () {
  console.log("Server started on port 3000");
});
