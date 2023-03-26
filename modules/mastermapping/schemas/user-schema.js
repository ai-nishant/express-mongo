const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    personId: { type: String },
    gender: String,
    dob: { type: String, index: true }, // YYYY-MM-DD
    dod: { type: String, index: true }, // YYYY-MM-DD
    name: {
      first: String,
      middle: String,
      last: String,
    },
    addresses: [
      {
        from: String, // YYYY-MM-DD
        to: String, // YYYY-MM-DD, will be empty for current address
        addressId: { type: String, index: true },
      },
    ],
  }, { timestamps: { createdAt: 'created_at' } });


  module.exports = userSchema