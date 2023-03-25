// importing models
const masterMappingModel = require("../model/mapping-master-entity");

const mongoose = require('mongoose');






// core db functionalities



async function createCollectionMapping(res) {
    try {       
        // await mongoose.connection.db.createCollection('person_3');
        // await mongoose.connection.db.createCollection('address_3');
        let collectionList = await mongoose.connection.db.listCollections().toArray();
        let persons =[];
        let address = [];
         collectionList.filter((i)=>{
            if(i.name.startsWith('person')){
                persons.push(i.name);
            }else if(i.name.startsWith('address')){ 
                address.push(i.name);
            }else{
                console.log(i.name,"others")
            }
        });


       
        res.status(200).send({ output: "success", result: "successfully inserted values",list:{persons,address} })
    } catch (error) {
        console.log(error,"errror")
        res.status(400).send({ output: "error", error: error })
    }
}



async function updateCollectionCounter() {
    try {

    } catch (error) {

    }
}


async function findLastestActiveCollection(res) {
    try {
        console.log("payload")
        res.status(200).send({ output: "success", result: "result" })
    } catch (error) {
        res.status(400).send({ output: "success", result: "result" })
    }
}

async function minMaxinCollection(collectionName){
    try {
        
    } catch (error) {
        
    }
}


// exporting as module functionalities below 

exports.createCollectionMapping = createCollectionMapping;
// exports.findOne = findOneUser;