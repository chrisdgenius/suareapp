const express = require('express')

const router = express.Router()

const Customer = require('../model/customer.model')

// to get statisticsof customers
router.get("/stats",  async (req, res) => {
    const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await Customer.aggregate([ 
        { $match: { entryDate: { $gte: lastYear } } },
        { $project: { month: { $month: "$entryDate" } } },
  
        { $group: { _id: "$month", total: { $sum: 1 } } }, 
    ])
        res.status(200).json(data);

   } catch(err){ 
    res.status(500).json(console.log(err));

   }
});

//get one customer

router.get("/:id", getCustomer, (req, res) => {
    res.json(res.customer);
});

//get all customers

router.get('/', async(req, res, ) => {
try { 
    const customers = await Customer.find();
    res.json(customers)
    
} catch (error) {
    res.status(500).json({message:error.message})
    
}
})

//create one customer
router.post("/", async (req, res) => {

    const customer = new Customer({
        _id: req.body._id,
        firstName: req.body.firstName,
        lastNames: req.body.lastNames,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        dob: req.body.dob,
        age: req.body.age,
        physicalAddress:req.body.physicalAddress,
        entryDate: req.body.entryDate,
    });

    try {
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }



});

//update customer
router.patch("/:id", getCustomer, async (req, res) => {
    if (req.body.firstName != null) {
        res.customer.firstName = req.body.firstName;
    }
    if (req.body._id != null) {
        res.customer._id = req.body._id;
    }
    if (req.body.lastNames != null) {
        res.customer.lastNames = req.body.lastNames;
    }
    if (req.body.phoneNumber != null) {
        res.customer.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.emailAddress != null) {
        res.customer.emailAddress = req.body.emailAddress;
    }
    if (req.body.age != null) {
        res.customer.age = req.body.age;
    }
    if (req.body.dob != null) {
        res.customer.dob = req.body.dob; 
    }
    if (req.body.physicalAddress != null) {
        res.customer.physicalAddress = req.body.physicalAddress;
    }


    try {
        const updatedCustomer = await res.customer.save()
        res.json(updatedCustomer)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



//delete customer
router.delete("/:id", getCustomer, async (req, res) => {
    try {
          await res.customer.remove();
        res.send({ status: 200, message:'Customer Deleted Successfuly' })
    } catch (error) {
        res.status(500).json({ message: err.message });

    }

})


async function getCustomer(req, res, next) {
    let customer;

    try {
        customer = await Customer.findById(req.params.id);
        if (customer == null) {
            return res.status(404).json({
                message: "This customer doesn't exsist"
            });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.customer = customer;
    next();
}







module.exports = router