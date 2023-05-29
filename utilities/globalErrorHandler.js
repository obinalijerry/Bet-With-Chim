module.exports = (err, req, res, next)=>{
   const {status = 500}= err;
   if(!err.message) err.message = 'Oh No, Something Went Wrong!'
   res.status(status).render('error',{err});
   console.log(err);
};