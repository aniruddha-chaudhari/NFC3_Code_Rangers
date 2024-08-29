import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  adopted: {
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
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shelter: {
    type: String,
    ref: 'Shelter',
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet;