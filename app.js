const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const globalErrorHandler =require('./utilities/globalErrorHandler');
const appError = require('./utilities/appError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const Subscriber = require('./models/subscribe')
const ejsMate = require('ejs-mate');




// const Userroutes =require('./routes/users');
const betwithchimroutes = require('./routes/betwithchimroutes');
const subscribe = require('./models/subscribe');

mongoose.set('strictQuery', true);

main().catch((err) => console.log("It doesnt work", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/betwithchim");
   
  console.log("Connection open");
}



app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public','favicon.ico')));
app.use(express.static(path.join(__dirname,'public')));


const sessionConfig ={
  secret :'thisshouldbeabettersecret',
  resave: false,
  saveUninitialized: true,
  cookie:{
      httpOnly:true,
      expires:Date.now()+ 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7

  } 

}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error')
  res.locals.comingsoon =req.flash('comingsoon');
  res.locals.subscriber=req.flash('subscriber');
  next();
})
// app.get('/betwithchim',(req,res)=>{
//     res.render('homepage/index');
// })
app.get('/comingsoon',async(req, res)=>{
  req.flash('comingsoon','Coming Soon')
  res.redirect('/betwithchim');
})

app.post('/subscribe', async(req, res)=>{
  try {
    const {email} = req.body
    const subscriber = new Subscriber({email});
  
    await subscriber.save()
    req.flash('subscriber','Successfully subscribed to email list')
    res.redirect('/betwithchim');
  
  } catch (err) {
    req.flash('error','Email already exists in email list')
    res.redirect('/betwithchim');
  }

  
  
})

app.use('/betwithchim',betwithchimroutes);




// app.get('/betwithchim',(req,res,next)=>{
//   try {
//     res.render('home');
//   } catch (err) {
//     next(err)
//   }
 
// })

// app.get('/betwithchim/signup',(req, res)=>{
 
// })

// app.get('/login',(req, res)=>{
//   res.render('login');
// })





app.all('*',(req, res, next)=>{
  next(new appError(`${req.originalUrl}`,404));
})

app.use(globalErrorHandler);


app.listen(3000, ()=>{
    console.log("App Listening On port 3000")
})