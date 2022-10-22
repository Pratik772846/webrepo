//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require('lodash');
const mysql=require('mysql');
const dotenv = require('dotenv');
const grocery = "GROCERY"
const others ="OTHERS"
const kitchen ="DAILY ESSENTIALS"
const confectionery ="CONFECTIONERY"

dotenv.config({path : './.env'});
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
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
