const mongoose = require('mongoose');
const passportlocalMongoose = require('passport-local-mongoose');

//Creating a new schema (email);
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique: true
    },
   gender:{
    type:String,
    required:[true,'Gender is required'],
    enum:['man','woman']
   }
});

//calling the passport strategy and also enabling email to be used as authentication.
userSchema.plugin(passportlocalMongoose, {usernameQueryFields :["email"]});

module.exports = mongoose.model('User',userSchema);