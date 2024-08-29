import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const shelterSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
   type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  dateAdded: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
  }
});

// Create and export the model
module.exports = mongoose.model('Shelter', shelterSchema);
