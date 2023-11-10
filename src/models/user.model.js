import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 0,
      required: true,
    },
    address: {
      type: Object,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
