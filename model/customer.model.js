const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    _id:{
        type: String
        
    },
    firstName: {
        type: String,
        required: true
    },
    lastNames: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    age:{
        type: Number
        
    },
    physicalAddress:{
        type: String
        
    },
    entryDate: {
        type: Date,
        required: true,
        default: Date.now
    }


})


module.exports = mongoose.model('Customers', customerSchema);