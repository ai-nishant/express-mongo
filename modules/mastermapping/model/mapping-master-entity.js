const mongoose = require('mongoose');

// Define a user schema as per use case
const mappingMasterSchema = new mongoose.Schema({
  collectionName: { type: String },
  personId: {
    type: Number,
    min: 1,
    max: 100000000
  },
  zipcodes: {
    type: Number,
    min: 1,
    max: 100000000
  },
  addressIds: {
    type: Number,
    min: 1,
    max: 100000000
  },
}, { timestamps: { createdAt: 'created_at' } });



// exporting the mongoose.Collection


const mappingMasterSchemaModel = mongoose.model("mappingmaster", mappingMasterSchema, 'mappingmaster');
module.exports = mappingMasterSchemaModel;