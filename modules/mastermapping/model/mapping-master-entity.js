const mongoose = require('mongoose');

// Define a user schema as per use case
const mappingMasterSchema = new mongoose.Schema({
    collectionName: { type: String },
    range:  {
    type: Number,
    min: 1,
    max: 120
  },
    street: String,
});



// exporting the mongoose.Collection


const mappingMasterSchemaModel = mongoose.model("mappingmaster", mappingMasterSchema,'mappingmaster');
module.exports = mappingMasterSchemaModel;