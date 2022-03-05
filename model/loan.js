const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let loanSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String
     
    },
    category: {
        type: Array
    },
   
    amount: {
        type: Number
    },
    date: {
        type: Date,
        required: true,
      default: Date.now
    }

},

 {
    collection: 'loan'
})
//export our schema and our model
module.exports = mongoose.model('loan', loanSchema)