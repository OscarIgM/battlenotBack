


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    inventory: [
      {
        gameId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Game',
        },
      },
    ],

   }
);
userSchema.pre('updateOne', async function (next) {
  // Verifica si la contraseña ha sido modificada antes de encriptarla nuevamente
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
  next();
});
const userModel = mongoose.model('User', userSchema);

export default userModel;