// importing models
const userModel = require("../model/user-entity");
const addressModel = require("../model/address-entity");



// dummy data function

// dummy data
const dummyUser = require("../dummyuser");
const dummyAddress = require("../dummyAddress");


const mongoose = require('mongoose');

async function combinedOutput(req, res) {

    try {

        const { from, to, status, zipCodes, addressIds } = req.query;
        // query formation
        var statusQuery = {};
        if (status.includes("dead")) {
            statusQuery = { dod: { $exists: true } };
        } else if (status.includes("living")) {
            statusQuery = { dob: { $exists: false } };
        } else {
            statusQuery: { }
        }

        var fromAndTo = {
            'addresses.from': { $gte: from },
            'addresses.to': { $lte: to },
        }
        var addressorZipcode = {};
        if (addressIds) {
            addressorZipcode = {
                "addresses.addressId._id": {
                    $in: addressIds.split(",").map(id => new mongoose.Types.ObjectId(id))
                }
            }
        } else {
            addressorZipcode = {
                "addresses.addressId.zipCode": {
                    $in: zipCodes.split(",")
                }
            }
        }

        const q = await userModel.aggregate([
            {
                $match: statusQuery

            },
            {
                $match: fromAndTo

            },
            {
                $unwind: { path: "$addresses" }
            },
            {
                '$lookup': {
                    from: 'address',//address schema name
                    localField: 'addresses.addressId',
                    foreignField: '_id',
                    as: 'addresses.addressId'
                }
            },
            {
                $match: addressorZipcode
            },
            {
                $addFields: {
                    "personID": "$personId",
                    "firstname": "$name.first",
                    "lastname": "$name.last",
                    "Age": {
                        "$dateDiff": {
                            "startDate": new Date("$dob"),
                            "endDate": "$$NOW",
                            "unit": "year"
                        }
                    },
                    "isAlive": {
                        $cond: {
                            if: { $eq: ["$dod", ""] },
                            then: true,
                            else: false
                        }
                    },
                    "Addresses": {
                        $map: {
                            input: "$addresses.addressId",
                            as: "addr",
                            in: {
                                "addressId": "$$addr._id",
                                "zipCode": "$$addr.zipCode",
                                "street": "$$addr.street",
                                "isCurrent": {
                                    $cond: {
                                        if: { $eq: ["$addresses.to", ""] },
                                        then: true,
                                        else: false
                                    }
                                },
                            }
                        }
                    }

                }
            },

            {
                $project: {

                    "personID": 1,
                    "firstname": 1,
                    "lastname": 1,
                    "Age": 1,
                    "isAlive": 1,
                    "Address": 1,
                    "_id": 1,
                    'Addresses': 1,


                }
            },
            {
                $limit: 10
            },
        ]).exec();
        return q
    } catch (error) {

        res.status(200).send({ error: error })
    }
}




// core db functionalities



async function createUser(res, payload) {
    try {
        const noOfRecords = payload != 0 ? payload.records : 100;

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


        let maxAddressId = await addressModel.find().collation({ locale: "en_US", strength: 2 }).sort({ addressId: -1 }).limit(1);
        let maxPersonid = await userModel.find().collation({ locale: "en_US", strength: 2 }).sort({ personId: -1 }).limit(1);
        let maxIds = {
            addr: maxAddressId[0].addressId, person: maxPersonid[0].personId
        }

        let total = await userModel.countDocuments();
        let totalAdd = await addressModel.countDocuments();
        res.status(200).send({ output: "success", totalRecords: { user: total, address: totalAdd }, duplicate: { person: personDuplication, address: addressDuplication }, max: maxIds })


    } catch (error) {
        res.status(400).send({ error: error })
    }
}

async function trying(req, res) {
    const { from, to, status, zipCodes, addressIds } = req.query;
    const query = {};

    // add the "from" and "to" dates criteria to the query object
    if (from && to) {
        query['addresses.from'] = { $gte: from };
        query['addresses.to'] = { $lte: to };
    }

    // add the "pincode" criteria to the query object
    if (zipCodes) {
        query['addresses.addressId.zipCode'] = zipCodes;
    }

    // add the "addressId" criteria to the query object
    if (addressIds) {
        const address = await AddressInfo.findOne({ _id: addressIds });
        if (address) {
            query['addresses.addressId'] = address._id;
        }
    }

    // find the users based on the query criteria
    const users = await userModel.find(query).populate('addresses.addressId');

    // return the list of users
    return users;
}




// exporting as module functionalities below 

exports.createUser = createUser;

exports.reports = collectionReport;
exports.final = combinedOutput;