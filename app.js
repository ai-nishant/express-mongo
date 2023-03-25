
const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 3000

// user model 
const userModel = require("./modules/user/model/user-entity");
const addressModel = require("./modules/user/model/address-entity");

// performance monitor


const autocannon = require('autocannon')


// dummy data
const dummyUser = require("./modules/user/dummyuser");
const dummyAddress = require("./modules/user/dummyAddress");
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


app.get('/', async (req, res) => {
  for (let index = 0; index < 10000000; index++) {
    const address = await addressModel.create(dummyAddress());
    let addressIdValue = address.addressId.valueOf();
    let userObj = dummyUser();
    userObj.addresses[0].addressId = addressIdValue;
    //    console.log(userObj,"dummyUser",addressIdValue);
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
    //    console.log(userObj,"dummyUser",addressIdValue);
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
    console.log(error,"eror")
    res.status(400).send({ output: error })
  }
  } catch (error) {
    console.log(error, "user err")
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