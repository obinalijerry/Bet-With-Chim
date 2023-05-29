const express = require("express");
const router = express.Router()
const User = require("../models/user");
const passport = require("passport");
const wrapAsync = require("../utilities/wrapAsync");



router.get('/',(req, res)=>{
    try {
        res.render('home');
      } catch (err) {
        next(err)
    }
})

router.get('/signup', (req, res)=>{
    res.render('signup');
})

router.post('/signup',wrapAsync(async(req, res, next)=>{
    try {
        const{email, username, password}=req.body;
        const user = new User({email, username});
        console.log(user.username);
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, function(err){
            if(err){
                return next(err);
            }
            req.flash('success', `Welcome to BetwithChim ${user.username}`);
            res.redirect('/');
        });  
    } catch (e) {
        req.flash("error",e.message);
        res.redirect('/signup');
        
    }

}))

router.get('/login',(req, res)=>{
    res.render('login'); 
})

router.post('/login',passport.authenticate('local',{failureFlash:true ,failureRedirect:'/login'}),(req, res)=>{
    req.flash('success', 'Welcome back!')
    res.redirect('/');
})
      
module.exports = router;