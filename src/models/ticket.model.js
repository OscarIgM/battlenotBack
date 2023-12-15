import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        user:{
type:String
        },
      subject: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      state:{
type:String,
required: true,
      },
    },
    { timestamps: true }
  );
  const ticketModel = mongoose.model('ticket', ticketSchema);

export default ticketModel;