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






// core db functionalities



async function createUser(res) {
    try {       
        for (let index = 0; index < 10; index++) {
            const address = await addressModel.create(dummyAddress());
            let addressIdValue = address.addressId.valueOf();
            let userObj = dummyUser();
            userObj.addresses[0].addressId = addressIdValue;
            const result = await userModel.create(userObj);
        }
        res.status(200).send({ output: "success", result: "successfully inserted values" })
    } catch (error) {

        res.status(400).send({ output: "error", error: error })
    }
}



async function deleteData() {
    try {

    } catch (error) {

    }
}


async function findOneUser(res) {
    try {
        console.log("payload")
        res.status(200).send({ output: "success", result: "result" })
    } catch (error) {
        res.status(400).send({ output: "success", result: "result" })
    }
}


// exporting as module functionalities below 

exports.createUser = createUser;
exports.findOne = findOneUser;