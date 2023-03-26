const mongoose = require('mongoose');

// Define a user schema as per use case
const addressSchema = new mongoose.Schema({
    addressId: { type: String },
    zipCode: { type: String, index: true },
    street: String,
}, { timestamps: { createdAt: 'created_at' } });

module.exports = addressSchema;