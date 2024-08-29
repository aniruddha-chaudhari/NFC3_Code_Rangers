import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  adopted:{
    type: Boolean,
    default: false
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0 
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  description: {
    type: String,
    required: false,
  },
  shelter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter',
    required: true
  },
  image: {
    type: String,
    required: false // Path or URL to pet's image
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
const Pet = mongoose.model('Pet', petSchema);

export default Pet;