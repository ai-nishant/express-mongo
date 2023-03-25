const mongoose = require('mongoose');

// Define a user schema as per use case
const addressSchema = new mongoose.Schema({
    addressId: { type: String },
    zipCode: { type: String, index: true },
    street: String,
}, { timestamps: { createdAt: 'created_at' } });

addressSchema.pre('save', function (next) {
    // let addr = mongoose.model("address", addressSchema);
    // addr.find().sort('-addressId').limit(1).then((res) => {
    //   this.addressId = res.length === 0 ? 1 : (Number(res[0].addressId)) + 1;
    //   next()
    // });
    mongoose.model("address", addressSchema).countDocuments().then((res) => {
        this.addressId = res + 1;
        next()
    });
});

// exporting the mongoose.Collection


const addressModel = mongoose.model("address", addressSchema,'address');
module.exports = addressModel;