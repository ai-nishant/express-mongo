const mongoose = require('mongoose');

// Define a user schema as per use case
const addressSchema = new mongoose.Schema({
    addressId: { type: String,index:true },
    zipCode: { type: String, index: true },
    street: String,
}, { timestamps: { createdAt: 'created_at' } });

addressSchema.pre('save', function (next) {    ;
    mongoose.model("address", addressSchema).countDocuments().then((res) => {
        this.zipCode = 400000 + res + 1;
        next()
    });
});

// exporting the mongoose.Collection


const addressModel = mongoose.model("address", addressSchema,'address');
module.exports = addressModel;