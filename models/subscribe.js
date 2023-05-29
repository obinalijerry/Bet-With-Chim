const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating a new subscriber schema that comprises of only email.
const subscriberSchema = new Schema({
    email:{
        type: String,
        required:true,
        unique: true
    }
})

// subscriberSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Subscriber',subscriberSchema);