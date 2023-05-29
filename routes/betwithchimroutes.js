const express = require("express");
const router = express.Router()
const User = require("../models/user");
const passport = require("passport");
const wrapAsync = require("../utilities/wrapAsync");
const { isloggedIn,validateUser } = require("../middleware");
const appError =require('../utilities/appError');
const globalErrorHandler =require('../utilities/globalErrorHandler');




router.get('/',(req, res)=>{
   
    try {
        const user = req.session.data;
        // const userInfo = req.session.info;
    
        // if(req.query.length !== 0 ){
        //     res.render('home',{username,email,gender})
        // }
        res.render('home',{user:user});
        
      } catch (err) {
        next(err)
    }
})

router.get('/signup', (req, res)=>{
    res.render('signup');
})

router.post('/signup',wrapAsync(async(req, res, next)=>{
    try {
        const{email, username, password,gender}=req.body;
        // const userDetails = new User({email,username,gender});
        const user = new User({email, username,gender});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, function(err){
            if(err){
                console.log(err);
                return next(err);
            }
        
            req.flash('success',`Welcome to BetwithChim  ${user.username.toUpperCase()}😊!!`);
            req.session.data = user;
            res.redirect('/betwithchim');
        });  
    } catch (e) {
        console.log(e);
        req.flash("error",e.toString().slice(25));
        res.redirect('/betwithchim/signup');
        
    }

}))

router.get('/login',(req, res)=>{
    
    res.render('login'); 
})

// router.post('/login',passport.authenticate('local',{failureFlash:true ,failureRedirect:'/betwithchim/login'}),(req, res)=>{
    
//     req.flash('success', 'Welcome back!')
//     const redirectUrl =req.session.returnTo || '/betwithchim'
//     res.redirect(redirectUrl);
// });
router.post(
    "/login",
    async (req, res, next) => {
      const redirectUrl = req.session.returnTo || '/betwithchim'//access the session request body first.
      
      const auth = passport.authenticate("local", {
          failureFlash: true,
          failureRedirect: "/betwithchim/login",
      });
      const result = await auth(req, res, next);
  
       res.returnTo = redirectUrl;
       return result;
    },
    (req, res) => {
      req.flash("success", `Welcome Back   ${req.user.username.toUpperCase()}😊!!`);
      const redirectUrl = res.returnTo || '/betwithchim'
      const user = req.user;
      req.session.data = user;
      res.redirect(redirectUrl);
    }
  );

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
        }
        req.flash('success',`Goodbye`)
        res.redirect('/betwithchim');
    });
});

router.get('/betoftheday',isloggedIn,(req, res,next)=>{
    const user = req.session.data;
   
    res.render('betofday',{user:user});
   
})

// router.get('*',(req, res, next)=>{
//     next(new appError(`${req.originalUrl}`,404));
// })

// router.use(globalErrorHandler);

      
module.exports = router;