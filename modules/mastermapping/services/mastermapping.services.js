// importing models
const masterMappingModel = require("../model/mapping-master-entity");

const userModel = require('../../user/model/user-entity');
const mongoose = require('mongoose');






// core db functionalities



async function createCollectionMapping(res) {
    try {
        let findMinMax = await minMaxinCollection("person", "personId");
        // await mongoose.model('person').aggregate([
        //     {
        //       $group: {
        //         _id: null,
        //         min: { $min: { $toInt: '$personId' } },
        //         max: { $max: { $toInt: '$personId' } },
        //       },
        //     },
        //   ]);
        // await mongoose.connection.db.createCollection('person_3');
        // await mongoose.connection.db.createCollection('address_3');
        let collectionList = await mongoose.connection.db.listCollections().toArray();
        let persons = [];
        let address = [];
        collectionList.filter(async (i) => {
            if (i.name.startsWith('person')) {               
                persons.push(i.name);
                let minMaxPerson = await minMaxinCollection("person", "personId");
                let minMaxAddress = await minMaxinCollection("person", "addresses.addressId");
                await insertNewMapping("person",minMaxPerson,minMaxAddress)
                
            } else if (i.name.startsWith('address')) {
                address.push(i.name);
            } else {
              
            }
        });




        res.status(200).send({ output: findMinMax, result: "successfully inserted values", list: { persons, address } })
    } catch (error) {
       
        res.status(400).send({ output: "error", error: error })
    }
}


async function insertNewMapping(name, minMaxPerson,minMaxAddress) {
    try {
        let mappingObj = {}

        mappingObj.collectionName = name;
        mappingObj.personId = { min: minMaxPerson[0].min, max:minMaxPerson[0].max };
        mappingObj.addressIds = { min: minMaxAddress[0].min, max: minMaxAddress[0].max };

      
        const result = await masterMappingModel.create(mappingObj);
        return result
    } catch (error) {
       
        return error
    }
}
async function updateCollectionCounter() {
    try {

    } catch (error) {

    }
}


async function findLastestActiveCollection(res) {
    try {
     
        res.status(200).send({ output: "success", result: "result" })
    } catch (error) {
        res.status(400).send({ output: "success", result: "result" })
    }
}

async function minMaxinCollection(collectionName, keyname) {
    try {
        let key = keyname;
        let findMinMax = await mongoose.model(collectionName).aggregate([
            { $unwind: '$addresses' },
            {
                $group: {
                    _id: null,
                    min: { $min: { $toInt: `$${key}` } },
                    max: { $max: { $toInt: `$${key}` } },
                },
            },
        ]);
        return findMinMax
    } catch (error) {
        return error
    }
}


// exporting as module functionalities below 

exports.createCollectionMapping = createCollectionMapping;
// exports.findOne = findOneUser;