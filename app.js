// importing main modules 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// performance monitor


// database connection 
mongoose.connect('mongodb://localhost/factset', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((i) => {
    console.log('Connected to MongoDB database.',);
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB database: ' + err);
  });


// user model 
const userModel = require("./modules/user/model/user-entity");
const addressModel = require("./modules/user/model/address-entity");



// importing route for different modules below
const userRoutes = require('./modules/user/router/user.routes');

const masterMappingRoutes = require('./modules/mastermapping/routes/mastermapping.routes');



const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use('/user',userRoutes)
app.use('/master',masterMappingRoutes)
const port = 3000






// dummy data
const dummyUser = require("./modules/user/dummyuser");
const dummyAddress = require("./modules/user/dummyAddress");



app.get('/', async (req, res) => {
  for (let index = 0; index < 10000000; index++) {
    const address = await addressModel.create(dummyAddress());
    let addressIdValue = address.addressId.valueOf();
    let userObj = dummyUser();
    userObj.addresses[0].addressId = addressIdValue;
    const result = await userModel.create(userObj);
  }
  res.status(200).send({ output: "success" })
})

app.get('/dummy', async (req, res) => {
  for (let index = 0; index < 200; index++) {
    const address = await addressModel.create(dummyAddress());
    console.log(address,"address")
    let addressIdValue = address.addressId.valueOf();
    let userObj = dummyUser();
    userObj.addresses[0].addressId = addressIdValue;
    const result = await userModel.create(userObj);
  }
  res.status(200).send({ output: "success" })
})

app.post("/search", async (req, res) => {
  try {

    try {
      
    
    // small query
    let q = await userModel.aggregate([
      {
        $unwind: "$addresses"
      },
      {
        $lookup:
        {
          from: "address",
          localField: "addresses.addressId",
          foreignField: "addressId",
          as: "addressData"
        }
      },
      
      {
        $limit: 10
      }
    ]);
    
   


    res.status(200).send({ output: q })

  } catch (error) {

    res.status(400).send({ output: error })
  }
  } catch (error) {
   
    res.status(400).send({ output: error })
  }

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



app.get('/report', async (req, res) => {
  let personDuplication = await userModel.aggregate([
    { $group: { _id: "$personId", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
  ]);

  let addressDuplication = await addressModel.aggregate([
    { $group: { _id: "$addressId", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
  ]);


  let maxAddressId = await addressModel.find().collation({ locale: "en_US", strength: 2 }).sort({addressId:-1}).limit(1);
  let maxPersonid = await userModel.find().collation({ locale: "en_US", strength: 2 }).sort({personId:-1}).limit(1);
  let maxIds = {
    addr:maxAddressId[0].addressId,person:maxPersonid[0].personId
  }

  let total  = await userModel.countDocuments();
  let totalAdd = await addressModel.countDocuments();
  res.status(200).send({ output: "success" ,totalRecords:{user:total,address:totalAdd},duplicate:{person:personDuplication,address:addressDuplication},max:maxIds})
})


// extra function

async function dateDiff(x, y) {
  let diff = new Date(y).getTime() - new Date(x).getTime()

  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
}