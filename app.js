//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require('lodash');
const mysql=require('mysql');
const dotenv = require('dotenv');
const session = require('express-session');
// const ejsLint = require('ejs-lint');

const grocery = "GROCERY"
const others ="OTHERS"
const kitchen ="DAILY ESSENTIALS"
const confectionery ="CONFECTIONERY"

dotenv.config({path : './.env'});
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({secret:"secret", resave: false,
saveUninitialized: true,}))
let posts=[]

const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'ecommerce'
})
db.connect((err)=>{
  if(!err){
      console.log('db connected');
  }
  else{
      console.log(err);
  }
})

app.get('/', function(req, res) {
  res.sendFile('views/index.html', {root: __dirname })
});


// app.get('/getposts',(req,res)=>{
//   let sql = 'SELECT * FROM posts';
//   let query = db.query(sql,(err,result)=>{
//       if(err) throw err;
//       console.log(result);
//       res.send('posts fetched...');
//   })
// })

app.get('/grocery',(req,res)=>{
  let sql = 'SELECT * FROM products WHERE type="grocery"';
  let query= db.query(sql,(err,result)=>{
    res.render("grocery",{grocery1:grocery , result:result});
  })
})

app.get('/others',(req,res)=>{
  let sql = 'SELECT * FROM products WHERE type="others"';
  let query= db.query(sql,(err,result)=>{
    res.render("others",{grocery1:others , result:result});
  })
})
app.get('/kitchen',(req,res)=>{
  let sql = 'SELECT * FROM products WHERE type="DE"';
  let query= db.query(sql,(err,result)=>{
    res.render("kitchen",{grocery1:kitchen , result:result});
  })
})
app.get('/confectionery',(req,res)=>{
  let sql = 'SELECT * FROM products WHERE type="confectionary"';
  let query= db.query(sql,(err,result)=>{
    res.render("confectionery",{grocery1:confectionery , result:result});
  })
})
app.get('/adminpage',(req,res)=>{
  res.sendFile('views/adminpage.html', {root: __dirname })
})
app.get('/adminform',(req,res)=>{
  res.sendFile('views/forms/adminform.html', {root: __dirname })
})
app.get('/request',(req,res)=>{
  res.sendFile('views/forms/request.html', {root: __dirname })
})
app.get('/signin',(req,res)=>{
  res.sendFile('views/forms/signin.html', {root: __dirname })
})
app.get('/signup',(req,res)=>{
  res.sendFile('views/forms/signup.html', {root: __dirname })
})
app.get('/allrequests',(req,res)=>{
  res.render("requests");
})
app.get('/orders',(req,res)=>{
  res.render("orders");
})

// cart=[]
// add to cart functionality
function isProductInCart(cart,pid){
  for(let i=0;i<cart.length;i++){
    if(cart[i].pid == pid){
      return true;
    }
  }
  return false;
}

function calculateTotal(cart,req){
   total=0;
  for(let i=0;i<cart.length;i++){
    total=total+ (cart[i].price * cart[i].quantity )
  }
  req.session.total = total;
  return total;
}
 
app.post('/add_to_cart',(req,res)=>{
  var pid= req.body.pid;
  var name= req.body.name;
  var description= req.body.description;
  var price= req.body.price;
  var quantity = req.body.quantity;
  var product ={pid:pid, name:name ,quantity :quantity, description:description, price:price};

  if(req.session.cart){
    var cart = req.session.cart;
    if(!isProductInCart(cart,pid)){
      cart.push(product);
    }
  } else{
      req.session.cart =[product];
      var cart = req.session.cart;
    } 
   // calculate total
  calculateTotal(cart,req);

  // // return to cart page
  // res.redirect('/cart');
  // }
  // // calculate total
  // calculateTotal(cart,req);

  // // return to cart page
  // res.redirect('/cart');

  // cart.push(product);
  // console.log(product);
  // console.log(cart);
  // res.render('/cart',{cart:cart});
  // calculateTotal(cart,req);
  // console.log(cart);
  res.redirect('/cart');
  
});
const mycart="YOUR CART";
app.get('/cart',(req,res)=>{
  var cart = req.session.cart;
  var total = req.session.total;
  res.render('cart',{cart:cart,total:total});
  // res.render('cart',{cart:cart,grocery1:mycart,total:total});
  // res.render('cart',{cart:cart,grocery1:mycart});
})

app.post('/remove_product',(req,res)=>{
  var pid = req.body.pid;
  var cart = req.session.cart;

  for(let i=0;i<cart.length ;i++){
    if(cart[i].pid == pid){
      // cart.splice(cart.indexOf(i),1);
      cart.splice(i,1);
    }
  }

  calculateTotal(cart,req);
  res.redirect('/cart');
})

app.post('/edit_product_quantity',(req,res)=>{
  var pid = req.body.pid;
  var quantity = req.body.quantity;
  var increase_btn = req.body.increase_quantity;
  var decrease_btn = req.body.decrease_quantity;

  var cart = req.session.cart;
  if(increase_btn){
    for(let i=0; i<cart.length ;i++){
      if(cart[i].pid == pid){
        if(cart[i].quantity >0){
          cart[i].quantity = parseInt(cart[i].quantity) +1; 
        }
      }
    }
  }
  if(decrease_btn){
    for(let i=0; i<cart.length ;i++){
      if(cart[i].pid == pid){
        if(cart[i].quantity >1){
          cart[i].quantity = parseInt(cart[i].quantity) -1; 
        }
      }
    }
  }
  calculateTotal(cart,req);
  res.redirect('/cart');
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

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
