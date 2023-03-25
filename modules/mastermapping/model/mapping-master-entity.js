const mongoose = require('mongoose');

// Define a user schema as per use case
const mappingMasterSchema = new mongoose.Schema({
  collectionName: { type: String },
  personId: [{

    min: String,
    max: String
  }],
  zipcodes: [{

    min: String,
    max: String
  }],
  addressIds: [{

    min: String,
    max: String
  }],
}, { timestamps: { createdAt: 'created_at' } });



// exporting the mongoose.Collection


const mappingMasterSchemaModel = mongoose.model("mappingmaster", mappingMasterSchema, 'mappingmaster');
module.exports = mappingMasterSchemaModel;