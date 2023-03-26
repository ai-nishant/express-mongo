// importing models
const userModel = require("../model/user-entity");
const addressModel = require("../model/address-entity");



// dummy data function

// dummy data
const dummyUser = require("../dummyuser");
const dummyAddress = require("../dummyAddress");


async function collectionLocation() {
    try {

    } catch (error) {

    }
}

async function combinedOutput(req, res) {
    try {
        // await addressModel.deleteManyMany({zipCode:"900002"})
       
        const { from, to, status, zipCodes, addressIds } = req.query;
        console.log({ from: from, to: to, status: status, zipcode: zipCodes, addressIds: addressIds });

        let statusQuery = {};
        if (status.includes("dead")) {
            statusQuery = { dod: { $exists: true } };
        } else {
            statusQuery = { dob: { $exists: true } };
        }

        var addressorZipcode = {};
        if (addressIds) {
            addressorZipcode = {
                "addressData._id": {
                    $in: addressIds.split(",")
                }
            }
        } else {
            addressorZipcode = {
                "addressData.zipCode": {
                    $in: zipCodes.split(",")
                }
            }
        }
        console.log({
            status: statusQuery, addressIdQuery: addressorZipcode
        })
        let q = await userModel.aggregate([
            {
                $unwind: "$addresses"
            },
            {
                $match: statusQuery
            },
            {
                $lookup:
                {
                    from: "address",
                    localField: "addresses.addressId",
                    foreignField: "_id",
                    as: "addressData"
                }
            },
            {
                $match: addressorZipcode
            },
            {
                $project: {
                    "_id":-1,
                    "personId": 1,
                    "gender": 1,
                    "dob": 1,
                    "dod": 1,
                    "name": 1,
                    "addresses":1,
                    "addressData":1
                }
            },
            {
                $limit: 10

            },

        ]);
        return res.status(200).send(q)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: error })
    }
}




// core db functionalities



async function createUser(res,payload) {
    try {
        const noOfRecords = payload !=0 ? payload.records:100 ;
        console.log(noOfRecords)
        for (let index = 0; index < noOfRecords; index++) {
            const address = await addressModel.create(dummyAddress());
            let addressIdValue = address._id.valueOf();
            let userObj = dummyUser();
            userObj.addresses[0].addressId = addressIdValue;
            const result = await userModel.create(userObj);
        }
        res.status(200).send({ output: "success", result: "successfully inserted values" })
    } catch (error) {
        res.status(400).send({ output: "error", error: error })
    }
}



async function collectionReport(res) {
    try {
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
        

    } catch (error) {
        res.status(400).send({error:error})
    }
}


async function findOneUser(res, req) {
    try {


        // Fetch data from MongoDB if not cached
        const users = await userModel.find({ _id: "641ed62a1f5f83f9bf587041" });


        res.status(200).send({ output: "success", result: use })
    } catch (error) {
        console.log(error, "error")
        res.status(400).send({ output: "success", result: "result" })
    }
}


// exporting as module functionalities below 

exports.createUser = createUser;
exports.findOne = findOneUser;

exports.final = combinedOutput;