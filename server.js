//DATABASEURL = mongodb+srv://managementplatform:mongoose@cluster0.s5pjr.mongodb.net/managementPlatform?retryWrites=true&w=majority
//DATABASEURL = "mongodb://localhost/limited"
require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require ('cors')
const PORT = 9000

/* to connect to mongose db*/
// process.env.DATABASEURL
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("connected to local MongoDB! is running"))

app.use(express.json())
app.use(cors())


//lets now setup our customer routes
const customersRouter = require('./routes/customers');
// tell the server to use that route
app.use('/customers', customersRouter);



//auth route
const auth = require('./routes/auth.route');
app.use('/auth', auth)

//loan
const loanRouter = require('./routes/loan');
app.use('/loan', loanRouter)

//order
const orderRouter = require('./routes/order');
app.use('/order', orderRouter)



// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});



app.listen(PORT, () => {
    console.log('Server running on localhost:' + PORT)
})
