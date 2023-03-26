const mongoose = require('mongoose');

// Define a user schema as per use case
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
      addressId:  { type: mongoose.Schema.Types.ObjectId, ref: 'address' },
    },
  ],
}, { timestamps: { createdAt: 'created_at' } });


userSchema.pre('save', function (next) {
  mongoose.model("person", userSchema).countDocuments().then((res) => {
    this.personId = res + 1;
    next()
});
});

// exporting the mongoose.Collection

const userModel = mongoose.model('person', userSchema,'person')

module.exports = userModel;