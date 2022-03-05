const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let orderSchema = new Schema({
    customerId: {
        type: String,
        required: true,
        unique: true
    },
 //arry of object
    loans: [
        {
          loanId: { type: String },
          quantity: { type: Number, default: 1 },
        },
    ],
    amount: {
    type: Number,
    required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    address: {
        type: Object,
        required: true
    },   
},
{ timestamps: true }
)

//export our schema and our model
module.exports = mongoose.model('order', orderSchema)