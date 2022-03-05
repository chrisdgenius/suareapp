const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let userSchema = new Schema({
    
    _id: {
        type: String
    },
    
    title: {
        type: String
    },
    gender: {
        type: String
      //  required: true,
      //  default: Date.now
    },
    name: {
        type: String
    },
   
    otherNames: {
        type: String
    },
    terms: {
        type: Boolean
    },
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },
    physicalAddress: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    dob: {
        type: String
    }

},



 {
    collection: 'users'
})
// to check the email
userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
//export our schema and our model
module.exports = mongoose.model('User', userSchema)