const {userSchemas}= require('./schemas.js');
const appError = require('./utilities/appError.js')
const User = require('./models/user.js');

module.exports.isloggedIn =(req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','You must be signed in first');
        return res.redirect('/betwithchim/login');
    }
    next()
}

module.exports.validateUser = (req, res, next)=>{
    
    const {error} = userSchemas.validate(req.body);
    if(error){
        const msg =error.details.map(el => el.message).join(',')
        throw new appError(msg, 400);
    }else{
        next();
    }
}