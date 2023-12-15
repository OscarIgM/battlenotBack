
import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      imageUrl:{
        type: String,
        required: true,
      }
    },
    { timestamps: true }
  );
  const gameModel = mongoose.model('game', gameSchema);

export default gameModel;